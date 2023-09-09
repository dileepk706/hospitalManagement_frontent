import React, { useEffect, useState } from 'react'
import UserTable from '../../doctor/userList/UserTable'
import { checkAdminAuth } from '../../../utils/chekAuth'
import { getAppointments } from '../../../services/admin/adminApi'
import { Appointment } from '../../../types/Models'
import AppointmentTable from '../../doctor/appointment/AppointmentTable'
import SingleAppointment from '../../doctor/appointment/SingleAppointment'
import DropDown from '../../dropdown/Dropdown'
import Pagination from '../../pagination/Pagination'

function AppointmentListWrapper() {
  
  const [appointments, setAppointments] = useState<Appointment[] | undefined>(undefined)
  const [singleAppointment, setSingleAppointment] = useState<Appointment | undefined>(undefined)
  const [singleAppointmentView, setSingleAppointmentView] = useState<boolean>(false)
  const [filter,setFileter]=useState('')
  const [page,setPage]=useState(1)

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
    },
    {
      option:'cancellation-requested',
      isSelected:false
    },
    {
      option:'cancelled',
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

 
  const getAllAppointments = async (filter?:string) => {
    try {
      const appntmnts = await getAppointments(filter,page)
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
            < div className='flex flex-col gap-2 '>
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
              <div className='w-full items-center justify-center'>


                <Pagination/>
              </div>
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
