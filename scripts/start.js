const detect = require('detect-port');
const { spawn } = require('child_process');

const DEFAULT_PORT = 3000;

detect(DEFAULT_PORT).then((port) => {
  if (port === DEFAULT_PORT) {
    console.log(`Starting server on port ${port}`);
  } else {
    console.log(`Port ${DEFAULT_PORT} is in use, starting server on port ${port}`);
  }

  const devProcess = spawn('npm', ['run', 'dev'], {
    env: { ...process.env, PORT: port },
    stdio: 'inherit',
  });

  devProcess.on('close', (code) => {
    console.log(`Process exited with code ${code}`);
  });
});
