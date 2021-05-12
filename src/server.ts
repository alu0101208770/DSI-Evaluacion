import * as express from 'express';
const { spawn } = require('child_process');

const app = express();

app.get('/execmd', (req, res) => {
  if (!req.query.cmd) {
    res.send({error: 'A comand has to be provided',});
  } else {
    let cmd_: string = String(req.query.cmd);
    let args_: string = String(req.query.args);

    const comand = spawn(cmd_, [args_]);

    comand.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    
    comand.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    comand.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  } 
});



app.get('*', (_, res) => {
  res.send('<h1>404</h1>');
})

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});