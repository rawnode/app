const { spawn } = require('child_process');

// Run a command and capture its stdout
const cmd = spawn('ls', ['-la']);
let stdout = '';
cmd.stdout.on('data', (data) => {
  stdout += data.toString();
});

// When the command exits, parse the stdout as JSON
cmd.on('close', (code) => {
  if (code === 0) {
    try {
      const json = JSON.parse(stdout);
      console.log(json);
    } catch (error) {
      console.error(`Failed to parse stdout as JSON: ${error}`);
    }
  } else {
    console.error(`Command failed with code ${code}`);
  }
});