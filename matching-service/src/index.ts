import * as express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import config from './config';

const main =async () => {
  const app = express.default();

  app.enable('trust proxy');
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use('/api', routes);

  app.get('/', (req, res) => res.send('Hello World with Express'));

  app.listen(config.port, () => {
    console.log("Listening on port " + config.port);
  });
}

main();
