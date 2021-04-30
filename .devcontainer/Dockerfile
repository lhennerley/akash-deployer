# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.163.1/containers/go/.devcontainer/base.Dockerfile
ARG VARIANT="1"
ARG AKASH_VERSION
FROM mcr.microsoft.com/vscode/devcontainers/go:0-${VARIANT}

# Always exit 0, for some reason succeeds but returns 1 as status code
RUN go get -d "github.com/ovrclk/akash"; exit 0
     
WORKDIR $GOPATH/src/github.com/ovrclk/akash

RUN make deps-install \
    && make install