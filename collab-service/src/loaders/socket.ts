import mongoose from 'mongoose';
import { Document, DocumentModel } from '../models/document';
import config from '../config';
import * as express from 'express';

export default async (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    transports: ['websocket'],
  });

  const defaultValue = '';

  io.on('connection', (socket) => {
    socket.on('join-room', async (roomId) => {
      	console.log('joined room');
	socket.join(roomId);
	const clients = io.sockets.adapter.rooms.get(roomId);
	console.log(clients);
	socket.in(roomId).emit('user-join',[...clients]);
    });

    socket.on('get-document', async (documentId) => {
      const document = await findOrCreateDocument(documentId);
      socket.emit('load-document', 'test');

      socket.on('send-changes', (delta) => {
        socket.broadcast.to(documentId).emit('receive-changes', delta);
      });

      socket.on('save-document', async (data, docId) => {
        // console.log(docId, data)
        await DocumentModel.findOneAndUpdate({ id: docId }, { data });
      });
    });
  });

  async function findOrCreateDocument(id) {
    if (id == null) return;

    const document = await DocumentModel.findOne({ id });
    if (document) return document;
    return await DocumentModel.create({ id, data: defaultValue });
  }
};
