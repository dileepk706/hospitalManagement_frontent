import React,{useState,useEffect,useCallback} from 'react'
import { useSocket } from '../../../context/SocketProvider';  
import { Appointment } from '../../../types/Models'
import demoImg from '../../../assets/images/smiling-nurse-portrait-isolated-white-using-digital-tablet_53419-9441 (1).jpg'
import { useAppSelector } from '../../../redux/hooks';
import { api } from '../../../api/axios';
import { Button } from '@mui/material';
import { editAppointmentStatus } from '../../../services/patients/patientLogin';
import { checkUserAuth } from '../../../utils/chekAuth';
import VideoCall from '../../../pages/patient/VideoCall';
import { useNavigate } from 'react-router-dom';
const moment = require('moment');

type props={
    singleAppointment: Appointment | undefined;
    setIsSingleAppointmentView: React.Dispatch<React.SetStateAction<boolean>>
    setSingleAppointment: React.Dispatch<React.SetStateAction<Appointment | undefined>>
  }
  const  SingleAppointment:React.FC<props>=({singleAppointment,setIsSingleAppointmentView,setSingleAppointment}) =>{
    const socket:any = useSocket();
    const navigate=useNavigate()
    const [countdown, setCountdown] = useState('');
    const [showVedioBtn, setShowVedioBtn] = useState(false);
    const [startVideoCall,setStartVideoCall]=useState(false)

    console.log(singleAppointment?.doctor._id,singleAppointment?.user._id)

    
    const user=useAppSelector(state=>state.user)

     const updateCountdown = () => {
        const targetDate = singleAppointment?.scheduledAt.slot_date;
        const targetTime =singleAppointment?.scheduledAt.slot_time;
        const targetDateTime = moment(`${targetDate} ${targetTime}`, 'YYYY-MM-DD h:mm A');
        const currentDateTime = moment();
        const duration = moment.duration(targetDateTime.diff(currentDateTime));
        console.log(duration._data.minutes);

        const days = Math.floor(duration.asDays());
        const hours = Math.floor(duration.asHours()) % 24;
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        if(minutes<5 && hours===0 && days===0){
          setShowVedioBtn(true)
        }
        if (duration <= 0) {
          setCountdown('Countdown expired');
          setShowVedioBtn(false)

          if (singleAppointment?.status !== 'notConsulted') {
             editAppointmentStatus(singleAppointment?._id?singleAppointment?._id:'' ).then(res => {
              setSingleAppointment(res.data)
            }).catch((err:any )=> {
              console.log(err);
              checkUserAuth(err)

            })
          }
          
        } else {
          setCountdown(`${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`);
        }
  };

  
  
  useEffect(() => {
    // Initial call to update the countdown
    updateCountdown();

    // Update the countdown every second
    let countdownInterval :any
    
    if(singleAppointment?.status==='notConsulted' && singleAppointment.isConsulted===false  ){
      countdownInterval = setInterval(updateCountdown, 1000);
    }
    return () => {
      clearInterval(countdownInterval);
    };
  }, []);


  const handleVedioConsulting = useCallback(() => {
    socket.emit("room:join", { email: user?.userName, room: singleAppointment?._id });
  }, [socket]);

  const handleJoinRoom = useCallback(
    (data:any) => {
      const { email, room } = data;
      console.log('data from backend', email, room)
      
      navigate(`/call/patient/${room}/${singleAppointment?.doctor._id}/${singleAppointment?.user._id}`);
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
    <>
     
      <div className='w-full h-screen grid grid-cols-1 gap-4 p-6 py-10 border border-gray-300 rounded-lg shadow-md bg-white relative md:grid-cols-2'>
      <div className='col-span-1'>
        <div className='mb-4'>
          <div className='flex justify-between'>
            <h3 className='text-sm font-semibold'>On {singleAppointment?.scheduledAt.slot_date}</h3>
            <h3 className='text-sm font-semibold'>At {singleAppointment?.scheduledAt.slot_time}</h3>
          </div>
          <div className='mt-2'>
            <button className='text-blue-500 hover:underline text-xs'>Change Date and Time</button>
          </div>
        </div>
    
        <hr className='my-2 border-gray-300' />
    
        <div className='flex items-center'>
          <div className='w-[10%]'>
            <img src={demoImg} alt="Doctor" className='w-12 h-12 rounded-full' />
          </div>
          <div className='w-[90%] ml-4'>
            <h1 className='text-lg font-semibold'>Dr. {singleAppointment?.doctor.name}</h1>
            <h2 className='text-gray-500 text-xs'>MBBS</h2>
            <h2 className='text-gray-500 text-xs'>{singleAppointment?.scheduledAt.slot_date}</h2>
            <h2 className='text-violet-900 text-sm'>₹ {singleAppointment?.consultingFee}</h2>
          </div>
        </div>
  
              <hr className='my-2 border-gray-300' />
              <div>
                    <p className='text-gray-500 text-xs'>Time remaining:</p>
                    <h3 className='txt-them text-sm '>{countdown}</h3>
              </div>
          </div>
  
          <div className='col-span-1 flex flex-col  gap-1 '>
              <div className=''>
                  <h1 className='text-xl font-semibold flex items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.293 10.293a1 1 0 011.414 0L10 13.586l5.293-5.293a1 1 0 111.414 1.414L10 16.414l-5.293-5.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Appointment Confirmed
                  </h1>
              </div>
             
              <div className='mt-4 space-y-2'>
                  <div>
                      <p className='text-gray-500 text-xs'>Appointment Id</p>
                      <h4 className='text-sm font-semibold'>{singleAppointment?._id}</h4>
                  </div>
                  <div>
                      <p className='text-gray-500 text-xs'>Patient Name</p>
                      <h4 className='text-sm font-semibold'>{user?.userName}</h4>
                  </div>
                  <div>
                      <p className='text-gray-500 text-xs'>Email</p>
                      <h4 className='text-sm font-semibold'>{user.userEmail}</h4>
                  </div>
                  {
                    user.userPhone && (
                      <div>
                      <p className='text-gray-500 text-xs'>Mobile</p>
                      <h4 className='text-sm font-semibold'>{user.userPhone}</h4>
                  </div>
                    )
                  }
              </div>
              <div className='mt-4'>
              <p className='txt-them text-xs'>Your consultaiton will be activate before the 5 min of your time</p>
              </div>
              <div className='mt-4'>
              <Button size='small' variant="contained"
                onClick={()=>{
                  handleVedioConsulting()
                }}
                 > Consult Now</Button>
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
  
          <div className='flex justify-between items-center mb-4 absolute top-1 right-1'>
                  <button
                      className='text-gray-500 hover:text-gray-700 flex items-center'
                      onClick={()=>setIsSingleAppointmentView(false)} // Add your onClick handler here
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.293 5.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 11-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Back
                  </button>
              </div>
              
      </div>
   


    
    </>
  )
}

export default SingleAppointment

