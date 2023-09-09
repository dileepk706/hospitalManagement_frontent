import React, { useEffect, useState } from 'react'
import DoctorCard from '../doctorSrchResltPage/DoctorCard'
import { checkUserAuth, removeDuplicates } from '../../../utils/chekAuth';
import { api } from '../../../api/axios';
import { Appointment, DoctorType } from '../../../types/Models';
import RaviewRatingForm from '../reviewAndRating/RaviewRatingForm';
import PrescriptionsModal from './PrescriptionsModal';

function MyDoctorListWrapper() {

  const [doctors, setDoctors] = useState<DoctorType[] | null>(null)
  const [isRevwMdalOpn,setIsRevwMdalOpn]=useState(false)
  const [oneDoctorId,setOneDoctorId]=useState('')
  const [hide,setHide]=useState({x:1500})
  const [isPrescriptionModalVisible, setisPrescriptionModalVisible] = useState(false);


  useEffect(() => {
    handlegetAppoints()
  }, [])

  const handlegetAppoints = async () => {
    try {
      const res = await api.get('/doctors/consulted')
      const data: Appointment[] = await res.data
      const doctrs = data.map(e => e.doctor)
      const uniqDoctors: DoctorType[] = removeDuplicates(doctrs)
      setDoctors(uniqDoctors)
    } catch (error: any) {
      console.log(error);
      //  error?.response?.data?.message && setApiError(error?.response?.data?.message)
      checkUserAuth(error)
    }
  }



  const modalVisibleHelper=()=>{
    hide.x===0?setHide({x:1000}):setHide({x:0})
    setisPrescriptionModalVisible(prev=>
      prev===false?true:false
    )
  }

  return (
    <>
    <div className='flex flex-col gap-4 ' >

      <h1 className='font-extrabold text-xl font-mono txt-them text-start mt-[3%] mb-[2%] ' >List Of Doctors You Consulted</h1>
      <hr  />
      {
        doctors?.map((doc,i)=>(
          <DoctorCard
          DoctorName= {doc.name || ''}  
          cunsultingFee= {doc.consultingFee}
          department= {doc.department?.departmentName} 
          experience= {doc.yearOfExperiance} 
          id= {doc._id} 
          rating= {doc.rating} 
          review= {doc.reviews} 
          image= {doc.image} 
          key={i}
          isAppointed={true}
          setIsRevwMdalOpn={setIsRevwMdalOpn}
          setOneDoctorId={setOneDoctorId}
          modalVisibleHelper={modalVisibleHelper}
        />
        
        ))
      }
     
    </div>



    {
        isRevwMdalOpn && (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50'>
        <button
          type='button'
          className='ml-2 absolute top-[10%] left-[7%] shadow-sm shadow-black  bg-white text-gray-700 py-2 px-4 rounded hover:bg-gray-400'
          onClick={()=>setIsRevwMdalOpn(false)}
        >
          Close
        </button>
        <RaviewRatingForm isConsulted={true} doctor={oneDoctorId}  />
      </div>
        )
      }


      {
        isPrescriptionModalVisible&&(
          <PrescriptionsModal
          doctorId={oneDoctorId}
          hide={hide}
          modalVisibleHelper={modalVisibleHelper}
          />
        )
      }
    </>
  )
}

export default MyDoctorListWrapper
