import * as express from 'express';
import database from './database';
import server from './server';
import socket from './socket';
import config from '../config';

export default async (app: express.Application) => {
  await database.connect();
  const wsServer = require('http').Server(app);
  socket(wsServer);
  server(app);

  wsServer.listen(config.port, () => {
    console.log(`App listening on port ${config.port}`);
    console.log('Press Ctrl+C to quit.');
  });
};
