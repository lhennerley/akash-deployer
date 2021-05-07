import { spawn } from "child_process";

const akashCli = spawn('akash', ["--keyring-backend", "test", "keys", "add", "newtest", "--output", "json"]);
const akashstdout = [];
const akashstderr = [];

akashCli.stdout.on('data', (data: string) => {
    console.log(data);
    // if (data.startsWith("override the existing name")) {
    //     akashstderr.push("Wallet already exists");
    //     akashCli.send("N");
    // }
    akashstdout.push(data);
});

akashCli.on('error', (err) => {
    akashstderr.push(err);
});

akashCli.on('close', (code) => {

});