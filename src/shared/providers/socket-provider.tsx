"use client";

import { createContext, useContext, PropsWithChildren } from 'react';
import { useSocket } from '@/shared/hooks/use-socket';

const SocketContext = createContext<ReturnType<typeof useSocket> | null>(null);

export function SocketProvider({ children }: PropsWithChildren) {
  const socket = useSocket();

  return (
    <SocketContext.Provider value={socket}>
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