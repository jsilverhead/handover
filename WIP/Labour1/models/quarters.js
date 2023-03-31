import mongoose from 'mongoose';
import mexp from 'mongoose-elasticsearch-xp';

const QuartersSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    space: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    housetype: {
      type: String,
      default: 'all',
    },
    picture: {
      type: String,
      required: true,
    },
    googleurl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

QuartersSchema.plugin(mexp);

export default mongoose.model('Quarters', QuartersSchema);
