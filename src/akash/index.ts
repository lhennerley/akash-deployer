import { spawn } from "child_process"

type CliResult = {
    result: number,
    stdout: string,
    stderr: string
}
type AddWalletResult = {
    name: string;
    type: string;
    address: string;
    pubkey: string;
    mnemonic: string;
}

class AkashCLI {
    public async setupWallet(wallet: string, passcode: string) {
        return new Promise<AddWalletResult>(async (resolve, reject) => {
            const args = ["--keyring-backend", "file", "keys", "add", wallet, "--output", "json"]
            const result = await this.runCli(args, [passcode]);
            resolve(JSON.parse(result.stdout))
        })
    }

    private async runCli(args: string[], inputs: string[]) {
        return new Promise<CliResult>((resolve, reject) => {
            const akashCli = spawn('akash', args);

            const akashstdout = [];
            const akashstderr = [];

            akashCli.stdout.on("data", (data) => {
                akashstdout.push(data);
            })

            akashCli.on('error', (err) => {
                console.log(err)
                akashstderr.push(err);
                reject(err);
            });

            akashCli.on('close', (code) => {
                resolve({
                    result: code,
                    stdout: akashstdout.join('\n'),
                    stderr: akashstderr.join('\n')
                });
            });
            let remainingInputs: string[] = inputs;

            setTimeout(() => {
                akashCli.stdin.write(`${remainingInputs[0]}\n`), 1000
                remainingInputs.shift()
            });
        });
    }
}

export default new AkashCLI();