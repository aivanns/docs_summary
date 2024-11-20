import { ManagerOptions, SocketOptions } from 'socket.io-client';

export const SOCKET_CONFIG = {
  url: process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001',
  options: {
    reconnectionDelayMax: 10000,
    autoConnect: true,
    transports: ['websocket', 'polling']
  } satisfies Partial<ManagerOptions & SocketOptions>
}; 