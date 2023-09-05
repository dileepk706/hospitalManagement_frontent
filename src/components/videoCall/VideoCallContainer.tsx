import React, { useContext, useEffect, useState, useCallback } from 'react'
import { SocketContext, useSocket } from '../../context/SocketProvider'
import ReactPlayer from "react-player";
import peer from '../../services/peer';
import { Phone } from '@mui/icons-material';
import { Button, Rating } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import RaviewRatingForm from '../patient/reviewAndRating/RaviewRatingForm';
import { Link } from 'react-router-dom';
import { editAppointmentStatus } from '../../services/patients/patientLogin';

type HandleUserJoined = {
  email: string
  id: string
}
type HandleIncommingCall = {
  from: any
  offer: any
  ans?: any
}
function VideoCallContainer() {

  const navigate=useNavigate()
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<any>();
  const [remoteStream, setRemoteStream] = useState<any>();
  const [isConnected, setIsConnected] = useState(false)
  const [streemView, setStreemView] = useState(true)
  const [isConulted,setIsConulted]=useState(false)
 
  const { role,room,doc,user } = useParams();

  console.log("GOT TRACKS!!",role,doc,user);


  const handleUserJoined = useCallback(({ email, id }: HandleUserJoined) => {
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }: HandleIncommingCall) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      setIsConnected(true)

      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });

    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    setStreemView(false)
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }: HandleIncommingCall) => {
      peer.setLocalDescription(ans);
      setIsConnected(true)
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegoNeedFinal = useCallback(async ({ ans }: HandleIncommingCall) => {
    await peer.setLocalDescription(ans);
  }, []);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }: HandleIncommingCall) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleHangUp = useCallback(() => {
    if (myStream) {
      myStream.getTracks().forEach((track: any) => {
        track.stop();
      });
    }
    setIsConulted(true)
    setRemoteSocketId(null);
    setMyStream(null);
    setRemoteStream(null);
  }, [])

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);


  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("call:ended", handleHangUp);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("call:ended", handleHangUp);

    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
    handleHangUp
  ]);



  const handleUserHangup = () => {
    (async function () {
      await editAppointmentStatus(room || '')
    }());
    socket.emit("call:ended", { to: remoteSocketId });
    handleHangUp()

    
  }


 
  return (
    <div className=' p-3 flex flex-col gap-5 items-center  h-screen '>

      {
        !isConnected && (
          <div className='bg-slate-800 rounded-lg flex items-center justify-center shadow-sm shadow-black w-[30%] h-[50%] p-5 ' >

            {
              !remoteSocketId ? (
                <div  >
                  <h1 className='text-lg font-bold font-mono my-5 text-center'>
                    {role==='doctor'?'Waiting for Patient to join the Room':'Waiting for Doctor to join the Room'}
                  </h1>
                  <div className="flex items-center justify-center space-x-2 animate-bounce">
                    <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
                    <div className="w-5 h-5 bg-green-400 rounded-full"></div>
                    <div className="w-5 h-5 bg-black rounded-full"></div>
                  </div>
                </div>

              ) : (
                <div className='flex flex-col  items-center justify-center ' >
                  <h1 className='text-lg font-bold font-mono my-5 text-center'>
                  {role==='doctor'?' Patient Joined ':' Doctor Joined '}
                   
                  </h1>
                  <button
                    onClick={() => {
                      setStreemView(false)
                      setIsConnected(true)
                      handleCallUser()
                    }}
                    type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <Phone />
                    <span className="sr-only">Icon description</span>
                  </button>
                </div>
              )
            }

          </div>
        )
      }

      {isConulted &&(

       <div className='  flex items-center justify-center w-full h-full ' >
        { role==='doctor'?(
          <div className='bg-slate-800 rounded-lg flex items-center justify-center shadow-sm shadow-black p-5 ' >
            <Button 
            
            variant='contained' size='small' color='primary'>
              <Link to={`/doctor/patients/${user}`}>
                Prescribe Medicines for The Patient
              </Link>
            </Button>
          </div>
        ):(
          
          <RaviewRatingForm doctor={doc ? doc:''} />
        )}
       </div>
       
      )}

      <div className='w-full flex gap-[10px] '>
        <div className=' w-[50%] rounded-xl'>
          {myStream && (
            <ReactPlayer
              style={{ borderRadius: '6%' }}
              playing
              muted
              height="100%"
              width="100%"
              url={myStream}
            />
          )}
        </div>

        <div className=' w-[50%] rounded-xl'>
          {remoteStream && (
            <ReactPlayer
              playing
              style={{ borderRadius: '6%' }}
              height="100%"
              width="100%"
              url={remoteStream}
            />
          )}
        </div>




      </div>

      {myStream&&(
        <div className='flex items-center  justify-between rounded-lg p-[10px] gap-5 bg-slate-800 '>
        {myStream && streemView && <Button variant='contained' size='small' color='primary' onClick={sendStreams}>Share Your Vedio</Button>}
        {myStream  && (
          <div onClick={handleUserHangup} className='flex items-center '>
            <Phone sx={{ fontSize: '36px' }} color='error' />
          </div>
        )
        }

      </div>
      )}

    </div>
  )
}
export default VideoCallContainer


// function VideoCallContainer() {
//     const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext)
//     const [callDoc,setCallDoc]=useState(false)
//     return (
//         <div className=' h-screen '>
//             <div className='grid grid-cols-12'>

//                 <div className=' col-span-3 border border-sky-500 '>
//                     <Options setCallDoc={setCallDoc} />
//                 </div>

//                 <div className=' col-span-9   '>

//                     <div className='w-full relative'>
//                     {
//                         stream && (
//                             <video playsInline muted ref={myVideo} autoPlay className="absolute bottom-[2%] right-[9%]  border border-sky-500  w-[21%]  " />
//                         )
//                     }
//                     {
//                         callAccepted && !callEnded ? (
//                             <div className=" ">
//                                 <video playsInline ref={userVideo} autoPlay className="w-[85%] m-auto" />
//                             </div>
//                         ):(
//                             <div className="w-[85%] bg-white h-screen m-auto flex justify-center items-center" >
//                                 {callDoc?(
//                                     <h2>Calling....</h2>
//                                 ):(
//                                     <h2>make a call</h2>
//                                 )}
//                             </div>
//                         )
//                     }
//                     </div>

//                     <Notifications />

//                 </div>
//             </div>

//         </div>
//     )
// }
