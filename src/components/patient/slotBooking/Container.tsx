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
      <DoctorDeatails doctor={doctor} rating={rating}  />
      {/* right bar section */}
      <SlotBookingSection slots={slots} doctor={doctor} rating={rating} modalVisibleHelper={modalVisibleHelper} setSelectedSlot={setSelectedSlot} />
      {/* modal for slot booking */}
      {isModalVisible&&(
        <BookingModal modalVisibleHelper={modalVisibleHelper} selectedSlot={selectedSlot} hide={hide} doctor={doctor}/>
        )
      }
     
    </div>
  )
}

export default Container