import React, { useEffect, useState } from 'react'
import UserTable from '../../doctor/userList/UserTable'
import { checkAdminAuth } from '../../../utils/chekAuth'
import { getAppointments } from '../../../services/admin/adminApi'
import { Appointment } from '../../../types/Models'
import AppointmentTable from '../../doctor/appointment/AppointmentTable'
import SingleAppointment from '../../doctor/appointment/SingleAppointment'
import DropDown from '../../dropdown/Dropdown'

function AppointmentListWrapper() {
  const [appointments, setAppointments] = useState<Appointment[] | undefined>(undefined)
  const [singleAppointment, setSingleAppointment] = useState<Appointment | undefined>(undefined)
  const [singleAppointmentView, setSingleAppointmentView] = useState<boolean>(false)
  const [filter,setFileter]=useState('')

  const filterOptions=[
    {
      option:'all',
      isSelected:false
    },
    {
      option:'consulted',
      isSelected:false
    },
    {
      option:'notConsulted',
      isSelected:false
    }
]
  useEffect(() => {
    getAllAppointments()

  }, [])

  const getAppointmentByfilter=(filter?:string)=>{
    // setFileter(filter)
    filter=filter==='all'?undefined:filter
    getAllAppointments(filter)

  }
  console.log({filter})
  const getAllAppointments = async (filter?:string) => {
    try {
      const appntmnts = await getAppointments(filter)
      setAppointments(appntmnts)
    } catch (error: any) {
      checkAdminAuth(error)
      console.log('error : ', error?.response?.status);
    }
  }
  return (
    <>
      <>
        {
          !singleAppointmentView ? (
            <div className='flex flex-col'>
              <div className="w-full z-10 p-2  sticky top-0 rounded-md flex justify-start gap-5" >

              <DropDown 
              name='Filters' 
              options={filterOptions}
              getdataByfilter={getAppointmentByfilter}
              />
              </div>
              <AppointmentTable
                appointments={appointments}
                setSingleAppointment={setSingleAppointment}
                setSingleAppointmentView={setSingleAppointmentView} />
            </div>
          ) : (
            <SingleAppointment
              singleAppointment={singleAppointment}
              setSingleAppointmentView={setSingleAppointmentView}
              isAdmin={true}
            />
          )
        }
      </>
    </>
  )
}

export default AppointmentListWrapper
