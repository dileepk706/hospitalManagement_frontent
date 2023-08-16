import React,{useState,useEffect} from 'react'
import { Appointment } from '../../../models/Models'
import demoImg from '../../../assets/images/smiling-nurse-portrait-isolated-white-using-digital-tablet_53419-9441 (1).jpg'
const moment = require('moment');

type props={
    singleAppointment: Appointment | undefined;
    setIsSingleAppointmentView: React.Dispatch<React.SetStateAction<boolean>>
}
const  SingleAppointment:React.FC<props>=({singleAppointment,setIsSingleAppointmentView}) =>{
    const [duration,setDuration]=useState<any>()
    const [countdown, setCountdown] = useState('');

    // useEffect(()=>{
    //     calculateTimeDuration(singleAppointment?.scheduledAt.slot_date,singleAppointment?.scheduledAt.slot_time)
    // },[])

     const updateCountdown = () => {
        const targetDate = singleAppointment?.scheduledAt.slot_date;
        const targetTime =singleAppointment?.scheduledAt.slot_time;
        const targetDateTime = moment(`${targetDate} ${targetTime}`, 'YYYY-MM-DD h:mm A');
        const currentDateTime = moment();
        const duration = moment.duration(targetDateTime.diff(currentDateTime));
    
        const days = Math.floor(duration.asDays());
        const hours = Math.floor(duration.asHours()) % 24;
        const minutes = duration.minutes();
        const seconds = duration.seconds();
    
        if (duration <= 0) {
          setCountdown('Countdown expired');
        } else {
          setCountdown(`${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`);
        }
  };

  useEffect(() => {
    // Initial call to update the countdown
    updateCountdown();

    // Update the countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  
   
    

  return (
    <div className='w-full h-screen grid grid-cols-2 gap-4 p-6 py-10 border border-gray-300 rounded-lg shadow-md bg-white relative'>
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
                    <p className='text-gray-500 text-xs'>Patient Name</p>
                    <h4 className='text-sm font-semibold'>Dileep</h4>
                </div>
                <div>
                    <p className='text-gray-500 text-xs'>Email</p>
                    <h4 className='text-sm font-semibold'>dileep@gmail.com</h4>
                </div>
                <div>
                    <p className='text-gray-500 text-xs'>Mobile</p>
                    <h4 className='text-sm font-semibold'>4554545455454</h4>
                </div>
            </div>
            <div className='mt-4'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs'>
                    Consult Now
                </button>
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
  )
}

export default SingleAppointment

