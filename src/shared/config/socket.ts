import { ManagerOptions, SocketOptions } from 'socket.io-client';
import { config } from '.';

export const SOCKET_CONFIG = {
  url: process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001',
  getOptions: () => ({
    reconnectionDelayMax: 10000,
    autoConnect: true,
    transports: ['websocket', 'polling'],
    extraHeaders: {
      Authorization: `Bearer ${document.cookie
        .split('; ')
        .find(row => row.startsWith(config.auth.JWT.ACCESS_TOKEN))
        ?.split('=')[1]}`
    }
  } satisfies Partial<ManagerOptions & SocketOptions>)
}; 