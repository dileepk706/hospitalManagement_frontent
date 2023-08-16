import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DoctorType, slots } from '../../../models/Models'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { chekout } from '../../../services/patients/patientLogin';
import { checkDocterAuth, checkUserAuth } from '../../../utils/chekAuth';

type BookingModalProps = {
    modalVisibleHelper: () => void
    selectedSlot: slots | undefined
    hide: any
    doctor: DoctorType | undefined
}
const BookingModal: React.FC<BookingModalProps> = ({ modalVisibleHelper, selectedSlot, hide, doctor }) => {
    const isUserAuthnticated=useAppSelector(state=>state.user.accessToken)
    const navigate=useNavigate()
    const location = useLocation();
    const path = location.pathname;
    console.log({ path });
    const [isLoading,setisLoading]=useState<boolean>(false)

    const checkout = async (price?:number,doctorName?:string,doctorId?:string,slotId?:string) => {
        try {
          setisLoading(true)
          if(price&&doctorName){
            const url=await chekout(price,doctorName,doctorId,slotId)
            console.log('url : ',url);
            
            window.location = url;
          }
        } catch (error) {
          console.error(error);
          checkUserAuth(error)
        }
      };

    return (
        <div className='flex justify-center items-center w-screen h-screen fixed'>
            <div className='relative w-full h-screen'>
                <motion.div
                    initial={{ x: 1500 }}
                    animate={hide}
                    transition={{ duration: 0.6 }}
                    className="w-[70%] h-[80vh] absolute rounded-lg shadow-lg shadow-black bg-gradient-to-b from-sky-200 to-sky-300 z-10 top-[5%] left-[11%]"
                >
                    <div className='w-full h-full grid grid-cols-2 relative'>

                        <button
                            className='absolute top-0 right-0 p-2 m-2 bg-gray-300 text-gray-700 rounded'
                            onClick={modalVisibleHelper}
                        >
                            Close
                        </button>

                        <div className='col-span-1 flex flex-col gap-4 bg-white shadow-md p-4'>
                            <div className='pb-2 border-b border-gray-300'>
                                <h1 className='text-2xl font-semibold'>Book Consultation</h1>
                            </div>
                            <div className='flex items-center justify-between py-2'>
                                <p className='text-sm text-gray-600'>On {selectedSlot?.slot_date}</p>
                                <p className='text-sm text-gray-600'>At {selectedSlot?.slot_time}</p>
                            </div>
                            <div className='flex flex-col justify-start py-2'>
                                <h3 className='text-lg font-semibold'>Dr. {doctor?.name}</h3>
                                <h5 className='text-sm text-gray-500'>MBBS</h5>
                                <p className='text-sm text-gray-600'>{doctor?.department?.departmentName} </p>
                            </div>
                        </div>

                        {/* Add Tailwind styles for this div */}
                        <div className='col-span-1 flex flex-col gap-4 bg-white   shadow-md p-4'>
                            <div>
                                <h1 className='text-2xl font-semibold'>Patient Details</h1>
                                <h4>Consultation for: DILEEP K</h4>
                                <p>Please provide the following information about Dileep K:</p>
                            </div>
                            <div>
                                <form>
                                    <div className='my-2'>
                                        <label htmlFor='full-name' className='text-gray-600'>Full name*</label>
                                        <input type='text' id='full-name' className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500' />
                                    </div>
                                    <div className='my-2'>
                                        <label htmlFor='mobile' className='text-gray-600'>Mobile*</label>
                                        <input type='text' id='mobile' className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500' />
                                    </div>
                                </form>
                            </div>
                            <div>
                                <h1 className='text-2xl font-semibold'>Bill details</h1>
                                <div className='flex justify-between'>
                                    <h5>Consultation fee</h5>
                                    <h5>₹ {doctor?.consultingFee}.00</h5>
                                </div>
                                <div className='flex justify-between'>
                                    <h5>Service fee and tax</h5>
                                    <h5>₹ 00.00</h5>
                                </div>
                                <div className='flex justify-between'>
                                    <h1 className='text-xl'>Amount to pay</h1>
                                    <h1 className='text-xl'>₹ {doctor?.consultingFee}.00</h1>
                                </div>
                            </div>
                            <div>
                                <button 
                                onClick={()=>{
                                    if(!isUserAuthnticated){
                                        localStorage.setItem('bookingUrl',path)
                                        navigate(`/login`)
                                    }
                                    checkout(doctor?.consultingFee,doctor?.name,doctor?._id,selectedSlot?._id)
                                }}
                                className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
                                >
                                    <span id="button-text">
                                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay & Confirm Consult"}
                                    </span>
                                
                                </button>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default BookingModal
