import React, { useState, useRef, useEffect } from 'react';
import { getAllAppointments } from '../../../services/patients/patientLogin';
import { Appointment } from '../../../types/Models';
import { checkUserAuth } from '../../../utils/chekAuth';
import { Link } from 'react-router-dom';
import SingleAppointment from './SingleAppointment';

const AppointmentsWrapper= () => {
    const [appointmens,setAppointments]=useState<Appointment[]>([])
    const [isSingleAppointmentView,setIsSingleAppointmentView]=useState(false)
    const [singleAppointment,setSingleAppointment]=useState<Appointment|undefined>(undefined)


     useEffect(()=>{
         const getAppointments=async()=>{
            try {
                const allAppointments:Appointment[]=await getAllAppointments()
                setAppointments(allAppointments)
            } catch (error) {
                console.error(error);
                checkUserAuth(error)
            }
         }
         getAppointments()
     },[])

     const singleAppointmentHelper=(id:string)=>{
        setIsSingleAppointmentView(true)
        const oneAppointment=appointmens?.find(appointmnt=>appointmnt._id===id)
        setSingleAppointment(oneAppointment)

     }
      
    return (
        //article and news section 
        <div className='flex flex-col w-full  gap-3'>
           



            {!isSingleAppointmentView ?
                (
                    
                    <div className='w-full'>
                        <div className='my-[10px]'>
                            <h1 className=' text-start txt-them text-xl font-semibold'>Appointment</h1>

                        </div>
                        {appointmens?.map(appointment =>(
                            <div className='flex w-full justify-between border p-4 rounded-md shadow-md bg-white mb-2'>
                            <div className='flex flex-col'>
                                <h1 className='text-xl font-semibold'>Dr. {appointment.doctor.name}</h1>
                                <h4 className='text-gray-500'>{appointment.scheduledAt.slot_date}</h4>
                                <h4 className='text-gray-500'>{appointment.scheduledAt.slot_time}</h4>
                            </div>
                            <div className='my-auto '>

                                <p className={`${appointment.status==='consulted'?`text-green-700`:`text-red-700`}`}>{appointment.status==='consulted'?'Consulted':'Not consulted'}</p>
                            </div>

                            <div className='flex justify-center items-center space-x-3'>
                                <button 
                                
                                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                                    <Link to={`/make-appointment/${appointment.doctor._id}`}>Book again</Link> 
                                </button>
                                <button 
                                onClick={()=>singleAppointmentHelper(appointment?._id)}
                                className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'>
                                    View Details
                                </button>
                            </div>
                        </div>
                        ) )}
                        {/* <h1 onClick={()=>setIsSingleAppointmentView(false)} >{singleAppointment?.consultingFee}</h1> */}
                        
                    </div>


                ) : (

                    <SingleAppointment
                        setIsSingleAppointmentView={setIsSingleAppointmentView}
                        singleAppointment={singleAppointment}
                        setSingleAppointment={setSingleAppointment}
                    />

                )
            }

        </div>

    );

}

export default AppointmentsWrapper
