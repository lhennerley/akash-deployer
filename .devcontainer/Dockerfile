# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.163.1/containers/go/.devcontainer/base.Dockerfile
ARG VARIANT="1"
FROM mcr.microsoft.com/vscode/devcontainers/go:0-${VARIANT}

ARG INSTALL_NODE="true"
ARG NODE_VERSION="lts/*"
RUN if [ "${INSTALL_NODE}" = "true" ]; then su vscode -c "source /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

# Always exit 0, for some reason succeeds but returns 1 as status code
RUN go get -d "github.com/ovrclk/akash"; exit 0

RUN npm install --global yarn
     
WORKDIR $GOPATH/src/github.com/ovrclk/akash

RUN make deps-install \
    && make install