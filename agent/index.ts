import http from 'http';
import crypto from 'crypto';
import fs from 'fs';

const AGENT_ID = '1234';
const TIME_INTERVAL_MS = 1000;

const publicKey = fs.readFileSync('../public_key.pem', 'utf8');

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
    hostname: 'localhost',
    port: 5555,
    path: '/api/temperature',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(JSON.stringify({ data }));
  req.end();
}

setInterval(sendData, TIME_INTERVAL_MS);
