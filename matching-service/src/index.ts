import * as express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import config from './config';
import { Exception } from './exceptions';

const main =async () => {
  const app = express.default();

  app.enable('trust proxy');
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use('/api', routes);

  app.get('/', (req, res) => res.send('Hello World with Express'));

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const error: Exception = new Exception('Not Found', 404);
    next(error);
  });

  // Default error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
  });

  app.listen(config.port, () => {
    console.log("Listening on port " + config.port);
  });
}

main();
