import { ManagerOptions, SocketOptions } from 'socket.io-client';
import { config } from '.';
import Cookies from 'js-cookie';

export const SOCKET_CONFIG = {
  url: process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001',
  getOptions: () => {
    const accessToken = Cookies.get(config.auth.JWT.ACCESS_TOKEN);
    return {
      reconnectionDelayMax: 10000,
      autoConnect: true,
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    } satisfies Partial<ManagerOptions & SocketOptions>;
  }
}; 