import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const reply = new Schema ({
  text: {
    type: String,
    required: true,
    maxlength: [512, 'title too long']
  },
  thread_id: {
    type: Schema.ObjectId,
    required: true
  },
  ip_Address: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: new Date()
  },
  reported: {
    type: Boolean,
    default: false
  },
  delete_password_hash: {
    type: String,
    required: true
  }
});

reply.pre('save', async function save(next) {
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

reply.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.delete_password_hash);
};

export default mongoose.model('replies', reply);