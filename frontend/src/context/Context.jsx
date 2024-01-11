import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";


const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  useEffect(()=>{
    console.log(import.meta.env.VITE_SOCKETB);
  })
  const [socket, setSocket] = useState();
  const { userInfo } = useSelector((state) => state.auth);
console.log(userInfo,"userContext");
  useEffect(() => {
    if (!userInfo) return;
    const newSocket = io(import.meta.env.VITE_SOCKETB, {
      withCredentials: true,
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: Infinity,
      transports: ["websocket"],
    });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
