import { Request, Response } from 'express';
import Temperature from '../models/temperature.model';

export default async (req: Request, res: Response) => {
  const { deviceId } = req.params;
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const recentData = await Temperature.find({
    deviceId,
    timestamp: { $gte: fiveMinutesAgo }
  }).sort({ timestamp: -1 });

  res.send(recentData);
}
