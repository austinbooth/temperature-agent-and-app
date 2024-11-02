import express from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import fs from 'fs';
import temperatureSchema from './mongooseSchema';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/temperatureDB');

const Temperature = mongoose.model('Temperature', temperatureSchema);

const privateKey = fs.readFileSync('../private_key.pem', 'utf8');

app.post('/api/temperature', async (req, res) => {
  try {
    const encryptedData = req.body.data;
    const decryptedData = crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64')).toString();
    const payload = JSON.parse(decryptedData);

    const { id, temp } = payload;
    const temperatureData = new Temperature({ deviceId: id, temperature: temp });
    await temperatureData.save();
    
    res.status(200).send('Data received and saved.');
  } catch (error) {
    res.status(500).send('Decryption or saving error.');
  }
});

app.get('/api/temperature/recent/:deviceId', async (req, res) => {
  const { deviceId } = req.params;
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const recentData = await Temperature.find({
      deviceId,
      timestamp: { $gte: fiveMinutesAgo }
  }).sort({ timestamp: -1 });

  res.send(recentData);
});

const PORT = 5555;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
