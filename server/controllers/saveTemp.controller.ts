import fs from 'fs';
import crypto from 'crypto';
import { Request, Response } from 'express';
import Temperature from '../models/temperature.model';

export default async (req: Request, res: Response) => {
  const privateKey = fs.readFileSync('../private_key.pem', 'utf8');

  try {
    const encryptedData = req.body.data;
    const decryptedData = crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64')).toString();
    const payload = JSON.parse(decryptedData);[]

    const { id, temp } = payload;
    const temperatureData = new Temperature({ deviceId: id, temperature: temp });
    await temperatureData.save();

    res.status(200).send('Data received and saved.');
  } catch (error) {
    res.status(500).send('Decryption or saving error.');
  }
}
