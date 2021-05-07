const cp = require('child_process');

let spawn_promise = (command, args, options, stream_output) => {
    return new Promise((resolve, reject) => {
        console.log(`${command} [${args}]`);

        let childProcess = cp.spawn(command, args, options);
        let std_out = '';
        let std_err = '';

        setTimeout(() => akashCli.stdin.write("12345678\n"), 2000)

        childProcess.stdout.on('data', function (data) {
            if (data == "Enter keyring passphrase:\n")
            {
                childProcess.stdin.write("12345678\n");
            }
            std_out += data.toString();
            if (stream_output)
                console.log(data.toString());
        });
        childProcess.stderr.on('data', function (data) {
            std_err += data.toString();
            if (stream_output)
                console.log(data.toString());
        });

        childProcess.on('close', (code) => {
            if (code === 0) {
                console.log(`exit_code = ${code}`);
                return resolve(std_out);
            }
            else {
                console.log(`exit_code = ${code}`);
                return reject(std_err);
            }
        });

        childProcess.on('error', (error) => {
            std_err += error.toString();
            if (stream_output)
                console.log(error.toString());
        });
    });
}
spawn_promise('akash', ['keys', 'add', 'test'],  { env: process.env})
   .then((a) => {
       console.log(a);
   });