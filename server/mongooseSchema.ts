import mongoose from 'mongoose';

export default new mongoose.Schema({
  deviceId: String,
  temperature: Number,
  timestamp: { type: Date, default: Date.now }
});
