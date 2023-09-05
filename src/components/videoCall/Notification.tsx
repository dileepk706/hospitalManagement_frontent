import React, { useContext } from 'react';

import { SocketContext } from '../../context/SocketProvider';  

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-md w-96 py-[5%] flex flex-col justify-center items-center gap-2 '>
            <h1 className='font-mono font-semibold '>{call.name} is calling </h1>
            <button className='them px-4 pt-4 rounded-sm ' onClick={answerCall}>
              Answer call
            </button>
          </div>
        </div>
      )}

    </>
  );
};

export default Notifications;