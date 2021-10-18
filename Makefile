VERSION ?= $(shell git describe --tags)
BUILD ?= $(shell git rev-parse --short HEAD)
PROJECTNAME := godrop
TARGET := .target
GOFILES := .
PREFIX := /usr/local
DESTDIR :=
BIN := godrop

# Use linker flags to provide version/build settings
LDFLAGS=-ldflags "-X=main.Version=$(VERSION) -X=main.Build=$(BUILD)"

## build: Compile the binary.
build: clean
	@mkdir -p $(TARGET)
	@GOPATH=$(GOPATH) \
		GOBIN=$(GOBIN) \
		GOARM=$(GOARM) \
		go build $(LDFLAGS) $(GOFLAGS) -o $(TARGET) $(GOFILES)

## clean the build folder
clean:
	@rm -Rf .target
	@rm -f .test_stl/*.gcode

test:
	@go test ./...

.PHONY: install
install: build
	install -Dm755 $(TARGET)/$(BIN) $(DESTDIR)$(PREFIX)/bin/${BIN}

.PHONY: uninstall
uninstall:
	rm -f $(DESTDIR)$(PREFIX)/bin/${BIN}

all: build