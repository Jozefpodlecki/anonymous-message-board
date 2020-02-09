import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const boards = new Schema ({
  name: {
    type: String,
    required: true,
    maxlength: [30, 'text too long']
  },
  created_on: {
    type: Date,
    default: new Date()
  },
  threadsCount: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('boards', boards);