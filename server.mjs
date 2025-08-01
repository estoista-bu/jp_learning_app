import { createServer } from 'https';
import { parse } from 'url';
import fs from 'fs';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Adjust paths to your certs
const httpsOptions = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, '0.0.0.0', () => {
    console.log('🔒 Frontend HTTPS ready at:');
    console.log(' - Local:  https://localhost:3000');
    console.log(' - Network: https://192.168.1.200:3000');
  });
});
