import { NextApiRequest, NextApiResponse } from "next";
import { exec, spawn } from "child_process"
import YAML from 'yaml'

type AkashCliResult = {
    result: number;
    stdout: string;
    stderr: string;
}

async function executeCLI(cmd) {
    console.log("About to execute this: ", cmd);
    var child = exec(cmd);
    return new Promise((resolve, reject) => {
        child.stdout.on('data', (data) => {
            console.log(`${data}`);
            process.stdin.pipe(child.stdin);
        });

        child.on('close', function (err, data) {
            if (err) {
                console.log("Error executing cmd: ", err);
                reject(err);
            } else {
                //   console.log("data:", data)
                resolve(data);
            }
        });
    });
}

export default async function (_: NextApiRequest, res: NextApiResponse) {
    const runAkash = new Promise<AkashCliResult>((resolve, reject) => {
        // TODO: Use the github username for the name of keyring
        const akashCli = spawn('akash', ["--keyring-backend", "test", "keys", "add", "test", "--output", "json"]);

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
            })
        });

        // TODO: Turn into a real rest call and allow user to input the passphrase for their key
        setTimeout(() => akashCli.stdin.write("12345678\n"), 2000);
    });
    const cliResult = await runAkash;
    // TODO: Parse the stdout properly, return mneumonic (for display purposes) and address/wallet info
    res.send(cliResult);
}
