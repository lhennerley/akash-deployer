# Overrides command line arguments
override network = "testnet"
AKASH_NET = "https://raw.githubusercontent.com/ovrclk/net/master/$(network)"

.devcontainer/devcontainer.env:
	curl -sS "$(AKASH_NET)/chain-id.txt" > akash-chain-id.txt
	curl -sS "$(AKASH_NET)/version.txt" > akash-version.txt
	echo "AKASH_NET=$(AKASH_NET)" > .devcontainer/devcontainer.env
	@x=$$(cat "akash-chain-id.txt"); \
    echo "AKASH_CHAIN_ID=$$x"  >> .devcontainer/devcontainer.env
	@x=$$(cat "akash-version.txt"); \
    echo "AKASH_VERSION=$$x"  >> .devcontainer/devcontainer.env
	rm akash-chain-id.txt
	rm akash-version.txt 