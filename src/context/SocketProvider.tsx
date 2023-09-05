

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
  const socket = useMemo(() => io("localhost:5000"), []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}



export { ContextProvider, SocketContext };

// const ContextProvider:React.FC<SocketProviderProps> = ({ children }) => {
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [stream, setStream] = useState<any>();
//   const [name, setName] = useState('');
//   const [call, setCall] = useState<{ isReceivingCall: boolean; from: string; name: string; signal: any }>({ isReceivingCall: false, from: '', name: '', signal: null });
//   const [me, setMe] = useState('');

//   const myVideo = useRef<HTMLVideoElement | null>(null); // Initialize with null
//   const userVideo = useRef<HTMLVideoElement | null>(null) // Initialize with null
//   const connectionRef = useRef<Peer.Instance | null>(null);

//   useEffect(() => {
//     console.log('object fgdshk sdkldg klsdhgkl sdhfkjlsdg  lsdhgsdkljsjfljsdhlg sdlvsdlkjhg')
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((currentStream) => {
//         setStream(currentStream);
//         if (myVideo.current) {
//           myVideo.current.srcObject = currentStream;
//         }
//       });

//     socket.on('me', (id) => setMe(id));

//     socket.on('callUser', ({ from, name: callerName, signal }) => {
//       setCall({ isReceivingCall: true, from, name: callerName, signal });
//     });
//   }, []);

//   const answerCall = () => {
//     setCallAccepted(true);

//     const peer = new Peer({ initiator: false, trickle: false, stream });

//     peer.on('signal', (data) => {
//       socket.emit('answerCall', { signal: data, to: call.from });
//     });

//     peer.on('stream', (currentStream) => {
//         userVideo.current!.srcObject = currentStream;
//     });

//     peer.signal(call.signal);

//     connectionRef.current = peer;
//   };

//   const callUser = (id:any) => {
//     const peer = new Peer({ initiator: true, trickle: false, stream });

//     peer.on('signal', (data) => {
//       socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
//     });

//     peer.on('stream', (currentStream) => {
//       userVideo.current!.srcObject = currentStream;
//     });

//     socket.on('callAccepted', (signal) => {
//       setCallAccepted(true);

//       peer.signal(signal);
//     });

//     connectionRef.current = peer;
//   };

//   const leaveCall = () => {
//     try {
//       console.log('call endesd ')
//       setCallEnded(true);
//       if (connectionRef.current) {
//         connectionRef.current.destroy();
//       }

//       // window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <SocketContext.Provider value={{
//       call,
//       callAccepted,
//       myVideo,
//       userVideo,
//       stream,
//       name,
//       setName,
//       callEnded,
//       me,
//       callUser,
//       leaveCall,
//       answerCall,
//     }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };