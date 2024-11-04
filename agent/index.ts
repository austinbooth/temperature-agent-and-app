import https from 'https';
import crypto from 'crypto';
import fs from 'fs';

const AGENT_ID = '1234';
const TIME_INTERVAL_MS = 1000;

const publicKey = fs.readFileSync('../public_key.pem', 'utf8');
const httpsOptions = {
  cert: fs.readFileSync('../cert.pem'),
  key: fs.readFileSync('../key.pem'),
  rejectUnauthorized: false,  // Allow self-signed certificates
  ca: fs.readFileSync('../cert.pem')
};

function getRandomTemperature(): number {
  return Math.floor(Math.random() * 41) + 10;
}

function createEncryptedPayload(): string {
  const temp = getRandomTemperature();
  const payload = { id: AGENT_ID, temp };
  const encryptedPayload = crypto.publicEncrypt(publicKey, Buffer.from(JSON.stringify(payload)));
  return encryptedPayload.toString('base64');
}

function sendData() {
  const data = createEncryptedPayload();

  const options = {
    ...httpsOptions,
    hostname: 'localhost',
    port: 5555,
    path: '/api/temperature',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);

    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    res.on('end', () => {
      if (responseData) {
        console.log('Response:', responseData);
      }
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.setTimeout(5000, () => {
    req.destroy();
    console.error('Request timeout');
  });

  req.write(JSON.stringify({ data }));
  req.end();
}

setInterval(sendData, TIME_INTERVAL_MS);

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Cleaning up...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Cleaning up...');
  process.exit(0);
});
