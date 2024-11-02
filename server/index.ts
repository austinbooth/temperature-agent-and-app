import express from 'express';
import saveTempController from './controllers/saveTemp.controller';
import getLast5MinsDataController from './controllers/getLast5MinsData.controller';
import getAverageTemperaturesController from './controllers/getAverageTemperatures.controller';

const app = express();
app.use(express.json());

app.post('/api/temperature', saveTempController);

app.get('/api/temperature/recent/:deviceId', getLast5MinsDataController);

app.get('/api/temperature/average/:deviceId', getAverageTemperaturesController);

const PORT = 5555;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
