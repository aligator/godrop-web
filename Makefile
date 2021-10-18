VERSION ?= $(shell git describe --tags)
BUILD ?= $(shell git rev-parse --short HEAD)
TARGET := .target
GOFILES := .

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

all: build