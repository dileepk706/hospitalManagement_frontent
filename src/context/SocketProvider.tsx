

// import React, { createContext, useState, useRef, useEffect } from 'react';
import React, { createContext, useMemo, useContext } from "react";

import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext<any>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};


interface SocketProviderProps {
    children: React.ReactNode;
  }
  

// const socket = io('http://localhost:5000');

const ContextProvider:React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useMemo(() => io("https://shopsmart.cloud"), []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}



export { ContextProvider, SocketContext };
