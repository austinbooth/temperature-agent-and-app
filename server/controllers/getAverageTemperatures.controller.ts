import { Request, Response } from 'express';
import Temperature from '../models/temperature.model';

interface TemperatureQueryParams {
  startDate: string;
  endDate: string;
}

interface TemperatureRouteParams {
  deviceId: string;
}

const THIRTY_MINUTES_MS = 30 * 60 * 1000;

export default async (
  req: Request<TemperatureRouteParams, {}, {}, TemperatureQueryParams>,
  res: Response,
) => {
  const { deviceId } = req.params;
  const { startDate, endDate } = req.query;

  const avgData = await Temperature.aggregate([
    { $match: { deviceId, timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
    {
      $group: {
        _id: {
          $toDate: {
            $subtract: [
              { $toLong: "$timestamp" },
              { $mod: [{ $toLong: "$timestamp" }, THIRTY_MINUTES_MS] }],
          },
        },
        averageTemp: { $avg: "$temperature" },
      }
    },
    {
      $project:
      {
        _id: 0,
        timestamp: "$_id",
        averageTemp: { $round: ["$averageTemp"] }
      },
    },
    { $sort: { timestamp: 1 } },
  ]);

  res.send(avgData);
}
