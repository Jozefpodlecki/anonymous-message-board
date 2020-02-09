import Reply from '../models/reply'
import Thread from '../models/thread'
import Board from '../models/board'
import { Types } from 'mongoose';
import { getIpAddress } from '../utils'

const getReplies = async (req, res) => {
  let { thread_id } = req.query;
  thread_id = Types.ObjectId(thread_id);
  
  const replies = await Reply.find({
    thread_id
  }).sort({
    created_on: 'descending'
  })
  
  const result = replies.map(({
    _id,
    text,
    ip_Address,
    created_on
  }) => ({
    id: _id,
    text,
    ip_Address,
    created_on
  }))
  
  res.json(result);
}

const createReply = async (req, res) => {
  const ip_Address = getIpAddress(req);
  let { text, thread_id, delete_password } = req.body;
  thread_id = Types.ObjectId(thread_id);
  
  const thread = await Thread.findById(thread_id);
  const board = await Board.findById(thread.board_id)
  
  const reply = new Reply({
    thread_id,
    ip_Address,
    text,
    delete_password_hash: delete_password
  });
  
  await reply.save();

  await Thread.findByIdAndUpdate(thread_id, {
    $set: {
      bumped_on: new Date()
    },
    $inc: {
      repliesCount: 1
    }
  }, {});
  
  res.redirect(`/b/${board.name}/${thread._id}`);
}

const reportReply = async (req, res) => {
  let { reply_id } = req.body;
  reply_id = Types.ObjectId(reply_id);
  
  await Reply.findByIdAndUpdate(reply_id, {
    $set: {
      reported: true
    }
  });
  
  res.send('reported reply');
}

const deleteReply = async (req, res) => {
  let { reply_id, thread_id, delete_password } = req.body;
  thread_id = Types.ObjectId(thread_id); 
  reply_id = Types.ObjectId(reply_id);
  
  const reply = await Reply.findById(reply_id);
  
  if(!reply) {
    return res.send("could not find reply");
  }
  
  if(await reply.validatePassword(delete_password)) {
    await reply.remove();
    await Thread.findByIdAndUpdate(thread_id, { 
      $inc: { threadsCount: -1 } 
    })
    return res.send("deleting reply");
  }
  
  return res.send('invalid password');
}

export default {
  getReplies,
  createReply,
  reportReply,
  deleteReply
}