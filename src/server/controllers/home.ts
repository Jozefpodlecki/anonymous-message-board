import * as path from 'path';

const get = (req, res) => {
    res.sendFile(path.join(__dirname + '/../../../public/index.html'))
  }

export default {
  get
}

