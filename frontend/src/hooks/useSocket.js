import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const createSocket = () => io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
  transports: ['websocket'],
});

export const useSocket = (eventHandlers = {}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = createSocket();
    socketRef.current = socket;

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    socket.emit('join', 'dashboard');

    return () => {
      socket.disconnect();
    };
  }, [eventHandlers]);

  return socketRef.current;
};
