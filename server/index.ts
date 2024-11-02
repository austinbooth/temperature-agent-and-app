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

app.post('/api/temperature', async (req: express.Request, res: express.Response) => {
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

const PORT = 5555;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
