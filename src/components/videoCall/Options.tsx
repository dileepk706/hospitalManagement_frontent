import React, { useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../../context/SocketProvider';  

type OptionsProps={
  setCallDoc:React.Dispatch<React.SetStateAction<boolean>>
}
const Options:React.FC<OptionsProps> = ({setCallDoc}  ) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  console.log({ me, callAccepted, name, setName, callEnded, leaveCall, callUser })

  return (


<div className="w-full p-5">
  <div className="mb-8">
    <h1 className="text-xl font-semibold mb-2">Account Info</h1>
    <div className="border border-gray-300 rounded-md p-2">
      <input
        className="w-full outline-none"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  </div>

  <div className="mb-6">
    <CopyToClipboard text={me}>
      <button className="bg-blue-700 text-white px-4 py-2 rounded-md">
        Copy Your ID
      </button>
    </CopyToClipboard>
  </div>

  <div className="flex flex-col gap-4">
    <h1 className="text-xl font-semibold mb-2">Doctor ID</h1>
    <div className="border border-gray-300 rounded-md p-2">
      <input
        className="w-full outline-none"
        placeholder="Enter doctor's ID"
        value={idToCall}
        onChange={(e) => setIdToCall(e.target.value)}
      />
    </div>
    {callAccepted && !callEnded ? (
      <button
        onClick={leaveCall}
        className="bg-red-700 text-white px-4 py-2 rounded-md"
      >
        Hang Up
      </button>
    ) : (
      <button
        onClick={() => {
          setCallDoc(true);
          callUser(idToCall);
        }}
        className="bg-green-700 text-white px-4 py-2 rounded-md"
      >
        Call
      </button>
    )}
  </div>
</div>


      // <div className="border-2 border-black p-6">
      //   {/* <form className="flex flex-col gap-6"> */}
      //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      //       <div>
      //         <h1   className="mb-4  ">Account Info</h1>
      //         <div className="border-2 border-black p-2" >
      //           <input   value={name} onChange={(e) => setName(e.target.value)}  />
      //         </div>
      //         <CopyToClipboard text={me}  >
      //           <button className='bg-blue-700 p-4 '   >
      //             Copy Your ID
      //           </button>
      //         </CopyToClipboard>
      //       </div>
      //       <div>
      //         <h1   className="mb-4">Make a call</h1>
      //         <input  value={idToCall} onChange={(e) => setIdToCall(e.target.value)}   />
      //         {callAccepted && !callEnded ? (
      //           <button   color="secondary"   onClick={leaveCall} className="mt-6">
      //             Hang Up
      //           </button>
      //         ) : (
      //           <button  color="primary"   onClick={() => callUser(idToCall)} className="mt-6">
      //             Call
      //           </button>
      //         )}
      //       </div>
      //     </div>
      //   {/* </form> */}
      // </div>
  );
};

export default Options;
