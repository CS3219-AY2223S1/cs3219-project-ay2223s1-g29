import { logger } from '../loggers/logger';

export default async (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    transports: ['websocket'],
  });

  io.on('connection', (socket) => {
    socket.on('join-room', async (roomId) => {
      logger.info(`Socket ${socket.id} joined room ${roomId}`);
      socket.join(roomId);
      const clients = io.sockets.adapter.rooms.get(roomId);
      logger.info(`Room ${roomId} has ${clients.size} clients`);
      socket.in(roomId).emit('user-join', [...clients]);
    });
  });

};
