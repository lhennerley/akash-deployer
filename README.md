# Akash Deployer

## What is this?

As a part of community, I have seen some requests to try and make deployment from your local machine, to Akash easy. What I aim to build here is as follows:

1. [x] A development container that handles the installation of Akash from source
2. [ ] A local GUI to deploy anything from [Awesome Akash](https://github.com/ovrclk/awesome-akash)
3. [ ] A local GUI that will generate a stack definition [deployment stack](https://docs.akash.network/documentation/sdl) for you
4. [ ] Ability to view deployments that you have done & the status in your local GUI

This repository will be open source and it will wrap around the Akash CLI. This is not intended to be a publicly hosted/public facing GUI and nor will it detract from the portal that Akash may build in the future.

This is also, in no way, affiliated with Akash - I am a engineer looking to provide something cool to the akashian community

## Setting up Akash with VSCode

**Level: Intermidiate**

**Required knowledge: Basic git**

In VSCode there is a relatively new extension called [VSCode Development Container](https://code.visualstudio.com/docs/remote/containers). How can you install Akash this way?

1. Install/make sure you have `git` locally (see: [how to install git](https://github.com/git-guides/install-git))
2. Run `git clone https://github.com/lhennerley/akash-deployer`
3. [Install VSCode](https://code.visualstudio.com/)
4. Install the [Remote Container Plugin](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
5. Open folder in VSCode
6. Run `make` for testnet or `make mainnet` if you want to go to mainnet
   - If you are on windows, the best easiest way to install `make` is with [Chocolatey](https://chocolatey.org/install)
7. Set environment variables in `.devcontainer/.env`
8. Click the bottom left & click "Reopen in container"
9. Type `akash` in your terminal, you will see the Akash CLI 😎
