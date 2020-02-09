import * as express from 'express';
import * as cors from 'cors';
import * as moment from 'moment';
import * as pretty from 'express-prettify'
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import routes from './src/server/routes';
import boardController from './src/server/controllers/board';
import * as history from 'connect-history-api-fallback';

const app = express();
const port = process.env.PORT as any;

const corsOptions: any = {
  optionSuccessStatus: 200
};

const mongoDbOptions = { 
  useNewUrlParser: true ,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': false}));
app.use(pretty({ query: 'pretty' }));
app.use(express.static(__dirname + '/public'));

app.use(cors(corsOptions));
app.use(history({
  index: '/',
  exclusions: [
    '/api/*'
  ]
}));

routes(app);


const mongoConnectionString = process.env.mongoConnectionString;

mongoose.connect(mongoConnectionString, mongoDbOptions).then(pr => {
  boardController.initialize();
  
  const listener = app.listen(port, () => {

    console.log('Listening on port ' + port);
  });  
})

