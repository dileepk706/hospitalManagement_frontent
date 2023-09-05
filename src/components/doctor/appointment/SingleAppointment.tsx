import React,{useCallback,useEffect} from 'react'
import { Appointment } from '../../../types/Models'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../../../context/SocketProvider';  

type SingleAppointmentProps={
    singleAppointment: Appointment | undefined
    setSingleAppointmentView: React.Dispatch<React.SetStateAction<boolean>>
    isAdmin?:boolean
}

const SingleAppointment:React.FC<SingleAppointmentProps>=({singleAppointment,setSingleAppointmentView,isAdmin})=> {
    const socket:any = useSocket();
    const navigate=useNavigate()

    const handleVedioConsulting = useCallback(() => {
      socket.emit("room:join", { email: singleAppointment?.doctor.name, room: singleAppointment?._id });
    }, [socket]);
  
    const handleJoinRoom = useCallback(
      (data:any) => {
        const { email, room } = data;
        console.log('data from backend', email, room)
        
        navigate(`/call/doctor/${room}/${singleAppointment?.doctor._id}/${singleAppointment?.user._id}`);
      },
      [navigate]
    );
  
    useEffect(() => {
      socket.on("room:join", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }, [socket]);


  return (
    <div className='w-full h-screen  gap-4 p-6 py-10 border border-gray-300 rounded-lg shadow-md bg-white relative'>

      <div className="flex justify-center items-center w-full " >
      <div className='  flex flex-col  gap-1 w-[30%] '>
              <div className=''>
                  <h1 className='text-xl font-semibold flex items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.293 10.293a1 1 0 011.414 0L10 13.586l5.293-5.293a1 1 0 111.414 1.414L10 16.414l-5.293-5.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Appointment Confirmed
                  </h1>
              </div>
             
              <div className='mt-4 space-y-2'>
                    <div className='my-5 flex justify-between items-center '>
                        
                      <p className='text-sm txt-them font-semibold'>On {singleAppointment?.scheduledAt?.slot_date}</p>
                      <p className='text-sm txt-them font-semibold'>At {singleAppointment?.scheduledAt?.slot_time}</p>

                  </div>
                  <div>
                      <p className='text-gray-500 text-xs'>Status</p>
                      <h4 className='text-sm font-semibold'>{singleAppointment?.status==='consulted'?'Consulted':'Not consulted'}</h4>
                  </div>
                  <div>
                      <p className='text-gray-500 text-xs'>Consulting fee</p>
                      <h4 className='text-sm font-semibold'>₹{singleAppointment?.consultingFee}.00</h4>
                  </div>
                  <div>
                      <p className='text-gray-500 text-xs'>Appointment Id</p>
                      <h4 className='text-sm font-semibold'>{singleAppointment?._id}</h4>
                  </div>
                  <div>
                      <p className='text-gray-500 text-xs'>Patient Name</p>
                      <h4 className='text-sm font-semibold'>{singleAppointment?.user?.name}</h4>
                  </div>
                  <div>
                      <p className='text-gray-500 text-xs'>Email</p>
                      <h4 className='text-sm font-semibold'>{singleAppointment?.user?.email}</h4>
                  </div>
                  {
                    singleAppointment?.user?.phone && (
                      <div>
                      <p className='text-gray-500 text-xs'>Mobile</p>
                      <h4 className='text-sm font-semibold'>{singleAppointment?.user?.phone}</h4>
                  </div>
                    )
                  }
              </div>
              <div className='mt-4'>
              {/* <p className='txt-them text-xs'>Your consultaiton will be activate before the 5 min of your time</p> */}
              </div>
              <div className='mt-4 flex justify-between items-center'>
            {
              !isAdmin && (
                <Button size='small' variant="contained"
                  onClick={handleVedioConsulting}
                > Consult Now
                </Button>
              )
            }

              <Button size='small' variant="contained" color='success'
                onClick={()=>{
                  const rout = isAdmin?'/admin/patients/':'/doctor/patients/'
                  navigate(`${rout}${singleAppointment?.user?._id}`)
                }}
                > View Patient
              </Button>
            {/* {
              showVedioBtn && singleAppointment?.status === 'pending' && singleAppointment.isConsulted === false ? (
                <Button size='small' variant="contained"
                onClick={()=>{
                  setStartVideoCall(true)
                }}
                 > Consult Now</Button>
              ) : (
                <Button  size='small' variant="contained" disabled>
                  Consult Now
                </Button>
              )
            } */}
                  
              </div>
          </div>
      </div>
  
          <div className='flex justify-between items-center mb-4 absolute top-1 right-1'>
                  <button
                      className='text-gray-500 hover:text-gray-700 flex items-center'
                      onClick={()=>setSingleAppointmentView(false)} // Add your onClick handler here
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.293 5.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 11-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Back
                  </button>
              </div>
    </div>
  )
}

export default SingleAppointment
