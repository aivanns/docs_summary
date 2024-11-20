"use client";

import { createContext, useContext, PropsWithChildren } from 'react';
import { useSocket } from '@/shared/hooks/use-socket';
import { useSessionStore } from '@/entities/session';
import { usePathname } from 'next/navigation';
import { HOME } from '@/shared/router/routes';

const SocketContext = createContext<ReturnType<typeof useSocket> | null>(null);

export function SocketProvider({ children }: PropsWithChildren) {
  const { isAuthenticated } = useSessionStore();
  const pathname = usePathname();
  
  // Подключаем сокет если пользователь авторизован или находится на странице summary
  const shouldConnect = isAuthenticated || pathname === HOME;
  const socket = useSocket(shouldConnect);

  return (
    <SocketContext.Provider value={socket}>
      {socket.contextHolder}
      {children}
    </SocketContext.Provider>
  );
}

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext должен использоваться внутри SocketProvider');
  }
  return context;
}; 