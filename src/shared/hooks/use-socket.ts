"use client";

import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_CONFIG } from '@/shared/config/socket';
import { message } from 'antd';

export const useSocket = (shouldConnect: boolean = true) => {
  const socketRef = useRef<Socket | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    console.log('shouldConnect', shouldConnect);
    if (shouldConnect) {
      socketRef.current = io(SOCKET_CONFIG.url, SOCKET_CONFIG.getOptions());

      socketRef.current.on('connect', () => {
        messageApi.success('Соединение с сервером установлено');
      });

      socketRef.current.on('disconnect', () => {
        messageApi.error('Соединение с сервером потеряно');
      });

      socketRef.current.on('connect_error', () => {
        messageApi.error('Ошибка подключения к серверу');
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }
  }, [messageApi, shouldConnect]);

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
    contextHolder
  };
}; 