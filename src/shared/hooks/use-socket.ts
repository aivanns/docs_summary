"use client";

import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_CONFIG } from '@/shared/config/socket';
import { message } from 'antd';
import Cookies from 'js-cookie';
import { config } from '@/shared/config';

// Добавим типы для callback функций
type SocketCallback = (data: unknown) => void;

export const useSocket = (shouldConnect: boolean = true) => {
  const socketRef = useRef<Socket | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const subscribersRef = useRef<Map<string, SocketCallback[]>>(new Map());

  const connect = useCallback(() => {
    if (socketRef.current?.connected) {
      return;
    }

    const token = Cookies.get(config.auth.JWT.ACCESS_TOKEN);
    if (!token) {
      return;
    }

    socketRef.current = io(SOCKET_CONFIG.url, {
      ...SOCKET_CONFIG.getOptions(),
      auth: {
        token
      }
    });

    socketRef.current.on('connect', () => {
      messageApi.success('Соединение с сервером установлено');
      
      // Восстанавливаем подписки после переподключения
      subscribersRef.current.forEach((callbacks, event) => {
        callbacks.forEach(callback => {
          socketRef.current?.on(event, callback);
        });
      });
    });

    socketRef.current.on('disconnect', () => {
      messageApi.error('Соединение с сервером потеряно');
    });

    socketRef.current.on('connect_error', () => {
      messageApi.error('Ошибка подключения к серверу');
    });
  }, [messageApi]);

  useEffect(() => {
    if (shouldConnect) {
      connect();
    }

    // Сохраняем ссылку на Map для очистки
    const subscribers = subscribersRef.current;

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      subscribers.clear();
    };
  }, [shouldConnect, connect]);

  const emit = useCallback((event: string, data: unknown) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    } else {
      connect();
    }
  }, [connect]);

  const on = useCallback((event: string, callback: SocketCallback) => {
    if (!subscribersRef.current.has(event)) {
      subscribersRef.current.set(event, []);
    }
    subscribersRef.current.get(event)?.push(callback);

    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  }, []);

  const off = useCallback((event: string, callback?: SocketCallback) => {
    if (socketRef.current) {
      if (callback) {
        socketRef.current.off(event, callback);
        const callbacks = subscribersRef.current.get(event) || [];
        subscribersRef.current.set(
          event,
          callbacks.filter(cb => cb !== callback)
        );
      } else {
        socketRef.current.off(event);
        subscribersRef.current.delete(event);
      }
    }
  }, []);

  return {
    socket: socketRef.current,
    emit,
    on,
    off,
    contextHolder
  };
}; 