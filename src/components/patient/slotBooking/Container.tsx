import React, { useState, useEffect } from 'react'
import DoctorDeatails from './DoctorDeatails'
import SlotBookingSection from './SlotBookingSection'
import { useParams } from 'react-router-dom'
import { DoctorType , slots } from '../../../types/Models'
import { findOneDoctor, findSlots } from '../../../services/patients/doctorapi'
import BookingModal from './BookingModal'
import RaviewRatingForm from '../reviewAndRating/RaviewRatingForm'

type ContainerType = {}

const Container: React.FC<ContainerType> = () => {



  const [doctor, setDoctor] = useState<DoctorType | undefined>(undefined)
  const [rating, setRating] = useState<number | undefined>(0)
  const [slots, setSlots] = useState<slots[] | undefined>([])
  const [hide,setHide]=useState({x:1500})
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSlot,setSelectedSlot]=useState<slots|undefined>(undefined)
  const [isRevwMdalOpn,setIsRevwMdalOpn]=useState(false)


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
      <DoctorDeatails doctor={doctor} rating={rating} setIsRevwMdalOpn={setIsRevwMdalOpn} />
      {/* right bar section */}
      <SlotBookingSection slots={slots} doctor={doctor} rating={rating} modalVisibleHelper={modalVisibleHelper} setSelectedSlot={setSelectedSlot} />
      {/* modal for slot booking */}
      {isModalVisible&&(
        <BookingModal modalVisibleHelper={modalVisibleHelper} selectedSlot={selectedSlot} hide={hide} doctor={doctor}/>
        )
      }
      {
        isRevwMdalOpn && (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50'>
        <button
          type='button'
          className='ml-2 absolute top-[10%] left-[7%] shadow-sm shadow-black  bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400'
          onClick={()=>setIsRevwMdalOpn(false)}
        >
          Close
        </button>
        <RaviewRatingForm doctor='sdss' />
      </div>
        )
      }
    </div>
  )
}

export default Container