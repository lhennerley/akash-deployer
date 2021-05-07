import { useEffect, useState } from "react";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { SigningCosmosClient } from "@cosmjs/launchpad";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Window extends KeplrWindow { }
}

export default function useKeplr(chainId: string) {
    const [cosmosClient, setCosmosClient] = useState<SigningCosmosClient>(null);

    useEffect(() => {
        async function detectKeplr(chainId: string) {
            // Enabling before using the Keplr is recommended.
            // This method will ask the user whether or not to allow access if they haven't visited this website.
            // Also, it will request user to unlock the wallet if the wallet is locked.
            await window.keplr.enable(chainId);

            const offlineSigner = window.getOfflineSigner(chainId);

            // You can get the address/public keys by `getAccounts` method.
            // It can return the array of address/public key.
            // But, currently, Keplr extension manages only one address/public key pair.
            // XXX: This line is needed to set the sender address for SigningCosmosClient.
            const accounts = await offlineSigner.getAccounts();

            // Initialize the gaia api with the offline signer that is injected by Keplr extension.
            const cosmJS = new SigningCosmosClient(
                "https://lcd-cosmoshub.keplr.app",
                accounts[0].address,
                offlineSigner,
            );

            setCosmosClient(cosmJS);
        }
        detectKeplr(chainId);
    }, []);

    return cosmosClient;
}