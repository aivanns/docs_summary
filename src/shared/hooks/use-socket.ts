"use client";

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_CONFIG } from '@/shared/config/socket';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_CONFIG.url, SOCKET_CONFIG.options);

    socketRef.current.on('connect', () => {});
    socketRef.current.on('disconnect', () => {});
    socketRef.current.on('connect_error', () => {});

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const emit = (event: string, data: any) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  };

  const on = (event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  };

  const off = (event: string) => {
    if (socketRef.current) {
      socketRef.current.off(event);
    }
  };

  return {
    socket: socketRef.current,
    emit,
    on,
    off,
  };
}; 