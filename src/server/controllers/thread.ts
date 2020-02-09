import Board from '../models/board'
import Thread from '../models/thread'
import Reply from '../models/reply'
import { Types } from 'mongoose';
import { getIpAddress } from '../utils'

const getThread = async (req, res) => {
  let { board: boardName, thread_id } = req.params;
  thread_id = Types.ObjectId(thread_id)
  
  const board = await Board.findOne({
    name: boardName
  });
  
  const thread = await Thread.findById(thread_id)
  
  const {
    _id,
    created_on,
    bumped_on,
    repliesCount,
    ip_Address,
    text
  } = thread;
  
  res.json({
    id: _id,
    created_on,
    bumped_on,
    repliesCount,
    ip_Address,
    text
  })
}

const getThreads = async (req, res) => {
  let { board: boardName, page = null, pageSize = null } = req.params;
  
  const board = await Board.findOne({
    name: boardName
  });
  
  let query = Thread.find({
    board_id: board._id
  }).sort({
    created_on: 'descending'
  })
  
  if(page && pageSize) {
    page = Number(page);
    pageSize = Number(pageSize);
    query = query.skip(pageSize * page).limit(pageSize);
  }
  
  const docs = await query;
  
  const result = await Promise.all(docs.map(async ({
    _id,
    text,
    created_on,
    ip_Address,
    bumped_on
  }) => {
    const replies = await Reply.find({
      thread_id: _id
    }).sort({
      created_on: 'descending'
    })
    .limit(3);
    
    return {
      id: _id,
      text,
      created_on,
      ip_Address,
      bumped_on,
      replies
    }}
  ));
    
  res.json(result)
}

const createThread = async (req, res) => {
  const { board: boardName } = req.params;
  const ip_Address = getIpAddress(req);
  const { text, delete_password } = req.body;
  
  const board = await Board.findOne({
    name: boardName
  });
  
  if(!board) {
    return res.send('board does not exist');
  }
  
  const thread = new Thread({
    board_id: board._id,
    ip_Address,
    text,
    delete_password_hash: delete_password
  });
  
  await thread.save();
  board.threadsCount++;
  await board.save();
  
  res.redirect(`/b/${boardName}/${thread._id}`);
  
}

const reportThread = async (req, res) => {
  let { thread_id } = req.body;
  thread_id = Types.ObjectId(thread_id);
  
  const thread = await Thread.findByIdAndUpdate(thread_id, {
    $set: {
      reported: true
    }
  });
  
  res.send('reported thread');
}

const deleteThread = async (req, res) => {
  const { board } = req.params;
  let { thread_id, delete_password } = req.body;
  thread_id = Types.ObjectId(thread_id);

  const thread = await Thread.findById(thread_id);
  
  if(!thread) {
    return res.send("could not find thread");
  }
  
  if(await thread.validatePassword(delete_password)) {
    await thread.remove();
    await Reply.deleteMany({
      thread_id
    })
    await Board.findOneAndUpdate({
      name: board
    }, { $inc: { threadsCount: -1 } })
    return res.send("deleting thread");
  }
  
  return res.send("invalid password");
}

export default {
  getThread,
  getThreads,
  createThread,
  reportThread,
  deleteThread
}