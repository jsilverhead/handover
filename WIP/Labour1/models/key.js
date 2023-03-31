import mongoose, { Schema } from 'mongoose';

const KeySchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  key: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

export default mongoose.model('key', KeySchema);
