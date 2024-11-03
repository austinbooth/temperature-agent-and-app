import express from 'express';
import https from 'https';
import fs from 'fs';

import saveTempController from './controllers/saveTemp.controller';
import getLast5MinsDataController from './controllers/getLast5MinsData.controller';
import getAverageTemperaturesController from './controllers/getAverageTemperatures.controller';

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.post('/api/temperature', saveTempController);
app.get('/api/temperature/recent/:deviceId', getLast5MinsDataController);
app.get('/api/temperature/average/:deviceId', getAverageTemperaturesController);

const options = {
  key: fs.readFileSync('../key.pem'),
  cert: fs.readFileSync('../cert.pem'),
};

const PORT = 5555;
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server is running on https://localhost:${PORT}`);
});
