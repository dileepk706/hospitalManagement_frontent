import React,{useEffect,useState} from 'react'
import { getPatients } from '../../../services/doctor/slots'
import { Appointment, UserType } from '../../../types/Models'
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers'
import { checkDocterAuth } from '../../../utils/chekAuth'
import SingleAppointment from './SingleAppointment'
import AppointmentTable from './AppointmentTable'

function AppointmentWrapper() {

    const [appointments,setAppointments]=useState<Appointment[]>()
    const [singleAppointment,setSingleAppointment]=useState<Appointment|undefined>(undefined)
    const [singleAppointmentView,setSingleAppointmentView]=useState<boolean>(false)
    useEffect(()=>{
        getAppointmetnHelper()
    },[])

    const getAppointmetnHelper=async ()=>{
        try {
            const appointments=await getPatients()
            setAppointments(appointments)
        } catch (error:any) {
            checkDocterAuth(error)
        }
    }

  return (
    <>
       { 
       !singleAppointmentView?(
         <AppointmentTable 
         appointments={appointments} 
         setSingleAppointment={setSingleAppointment} 
         setSingleAppointmentView={setSingleAppointmentView}
         
         />
       ):(
        <SingleAppointment 
        singleAppointment={singleAppointment} 
        setSingleAppointmentView={setSingleAppointmentView} 
        getAppointmetnHelper={getAppointmetnHelper} />
       )
        }
    </>
  )
}

export default AppointmentWrapper
