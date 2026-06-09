const { Server } = require('socket.io');
const { logger } = require('../config/logger');

const initSocket = (server) => {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    logger.info('Socket connected', { socketId: socket.id });

    socket.on('join', (room) => {
      socket.join(room);
      socket.emit('joined', { room });
    });

    socket.on('disconnect', () => logger.info('Socket disconnected', { socketId: socket.id }));
  });

  io.on('error', (err) => logger.error('Socket error', err));

  global.io = io;
};

const pushEvent = (event, payload) => {
  if (global.io) global.io.emit(event, payload);
};

module.exports = { initSocket, pushEvent };
