import { NextApiRequest, NextApiResponse } from "next";
import cli from "../../../../akash"

export default async function (_: NextApiRequest, res: NextApiResponse) {
    // TODO: Feature request akash to override the directory path so that you can have one passcode per wallet, 
    // TODO: Use http post with username/identity associated with current user
    return await cli.setupWallet("test", process.env.WALLET_PASCODE)
}