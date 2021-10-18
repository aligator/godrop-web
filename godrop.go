package main

import (
	"embed"
	"errors"
	"github.com/aligator/godrop/server"
	"github.com/aligator/godrop/server/log"
	"github.com/aligator/godrop/server/provider"
	"github.com/go-chi/chi/v5"
	"io/fs"
	"net/http"
	"os"
	"strings"
)

//go:embed build
var frontend embed.FS

func serveFrontend(router *chi.Mux) {
	subFS, err := fs.Sub(frontend, "build")
	if err != nil {
		panic(err)
	}
	httpFS := http.FileServer(http.FS(subFS))
	router.Handle("/*", http.StripPrefix("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer httpFS.ServeHTTP(w, r)

		if r.URL.Path == "" {
			r.URL.Path = "/"
			return
		}

		f, err := subFS.Open(strings.TrimSuffix(r.URL.Path, "/"))
		if errors.Is(err, fs.ErrNotExist) {
			r.URL.Path = "/"
			return
		} else if err != nil {
			panic(err)
		} else {
			err := f.Close()
			if err != nil {
				panic(err)
			}
		}
	})))
}

func main() {
	logger := log.DefaultLogger()

	filesLocation := os.Getenv("GODROP_FILES")
	if filesLocation == "" {
		filesLocation = "./files"
	}

	repos, err := provider.NewDefaultRepos(filesLocation)
	if err != nil {
		logger.Fatal(err)
	}

	s := server.Server{
		Host:           os.Getenv("GODROP_HOST"),
		AllowedOrigins: []string{"*"},
		Repos:          repos,
		Logger:         logger,
	}

	if s.Host == "" {
		// Set localhost as default else windows needs to open the firewall
		// for each new compiled binary, which is very annoying in development.
		s.Host = "localhost:8080"
	}

	router := s.Init()
	serveFrontend(router)
	s.Logger.Printf("connect to http://%s to access the GoDrop web frontend", s.Host)
	s.Run()
}
