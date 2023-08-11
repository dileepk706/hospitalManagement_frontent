import React, { useState, useEffect } from 'react'
import DoctorDeatails from './DoctorDeatails'
import SlotBookingSection from './SlotBookingSection'
import { useParams } from 'react-router-dom'
import { DoctorType, Slot, slots } from '../../../models/Models'
import { findOneDoctor, findSlots } from '../../../services/patients/doctorapi'
import { motion } from 'framer-motion'

type ContainerType = {}

const Container: React.FC<ContainerType> = () => {
  const [doctor, setDoctor] = useState<DoctorType | undefined>(undefined)
  const [rating, setRating] = useState<number | undefined>(0)
  const [slots, setSlots] = useState<slots[] | undefined>([])
  const [hide,setHide]=useState({x:1500})
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSlot,setSelectedSlot]=useState<slots|undefined>(undefined)

  const hiden={x:1500}
  const show={x:1500}


  const { id } = useParams()

  useEffect(() => {
    findDoctorHelper()
    findSlotsHelper()
  }, [id])

  const findDoctorHelper = async () => {
    try {
      const Doctor: DoctorType | undefined = await findOneDoctor(id)
      setRating(Doctor?.rating)
      setDoctor(Doctor)
    } catch (error: any) {
      console.log('error : ', error?.response?.status);
    }
  }
  const findSlotsHelper=async ()=>{
    try {
      const Slots:slots[]=await findSlots(id)
      setSlots(Slots)      
    } catch (error: any) {
      console.log('error : ', error?.response?.status);
    }
  }
  const modalVisibleHelper=()=>{
    hide.x===0?setHide({x:1000}):setHide({x:0})
    setIsModalVisible(prev=>
      prev===false?true:false
    )
  }
  return (
    <div className='flex w-full '>
      {/* left section */}
      
      <DoctorDeatails doctor={doctor} rating={rating} />
      {/* right bar section */}
      <SlotBookingSection slots={slots} doctor={doctor} rating={rating} modalVisibleHelper={modalVisibleHelper} setSelectedSlot={setSelectedSlot} />


      {isModalVisible&&
      (
      <div className='flex justify-center items-center w-screen h-screen fixed'>
  <div className='relative w-full h-screen'>
    <motion.div
      initial={show}
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
              <h5>₹ 00</h5>
            </div>
            <div className='flex justify-between'>
              <h1 className='text-xl'>Amount to pay</h1>
              <h1 className='text-xl'>₹ {doctor?.consultingFee}.00</h1>
            </div>
          </div>
          <div>
            <button className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'>
              Pay & Confirm Consult
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  </div>
</div>

      )
      }
    </div>
  )
}

export default Container