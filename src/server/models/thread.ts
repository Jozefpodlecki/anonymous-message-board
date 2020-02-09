import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const thread = new Schema ({
  board_id: {
    type: Schema.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true,
    maxlength: [512, 'text too long']
  },
  created_on: {
    type: Date,
    default: new Date()
  },
  ip_Address: {
    type: String,
    required: true
  },
  bumped_on: {
    type: Date,
    default: new Date(),
    required: true
  },
  reported: {
    type: Boolean,
    default: false
  },
  delete_password_hash: {
    type: String,
    required: true
  },
  repliesCount: {
    type: Number,
    default: 0
  }
  
});
  
thread.pre('save', async function save(next) {

  if (!this.isModified('delete_password_hash')) {
    return next();
  }
    
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.delete_password_hash = await bcrypt.hash(this.delete_password_hash, salt);
    return next();
    
  } catch (err) {
    return next(err);
  }
});

thread.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.delete_password_hash);
};

export default mongoose.model('threads', thread);