package main

import (
	"embed"
	"github.com/aligator/godrop/server"
	"io/fs"
)

//go:embed build
var frontend embed.FS

func main() {
	subFS, err := fs.Sub(frontend, "build")
	if err != nil {
		panic(err)
	}
	server.Run(subFS)
}
