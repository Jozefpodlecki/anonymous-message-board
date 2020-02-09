import Board from '../models/board'
import { Types } from 'mongoose';

const initialize = async (req = null, res = null) => {
  
  let general: any = null;
  
  general = await Board.find({
    name: 'general'
  })
  
  if(general && general.length) {
    if(res) {
      return res.send('initialized');
    }
    
    return;
  }
  
  general = new Board({
    name: 'general'
  })
  
  const politics = new Board({
    name: 'politics'
  })
  
  const computerScience = new Board({
    name: 'computer science'
  })
  
  const geography = new Board({
    name: 'geography'
  })
  
  const medicine = new Board({
    name: 'medicine'
  })
  
  await general.save();
  await politics.save();
  await computerScience.save();
  await geography.save();
  await medicine.save();
  
  if(res) {
    res.send('initialized');  
  }
}

const getBoards = async (req, res) => {
  const boards = await Board.find({});
  const result = boards.map(({_id, name}) => ({
    id: _id,
    name
  }))
  
  res.json(result);
}

export default {
  initialize,
  getBoards
}