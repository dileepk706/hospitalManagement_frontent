import React from 'react'
import { Appointment } from '../../../types/Models'

type AppointmentTableProps={
    appointments: Appointment[] | undefined
    setSingleAppointment: React.Dispatch<React.SetStateAction<Appointment | undefined>>
    setSingleAppointmentView: React.Dispatch<React.SetStateAction<boolean>>
}
const AppointmentTable:React.FC<AppointmentTableProps>=({appointments,setSingleAppointment,setSingleAppointmentView}) =>{
  return (
     <div className='flex flex-col '>
            <div className='p-[10px] '>
                <h1 className='text-start font-medium text-lg'>Appointment List</h1>
            </div>
            <hr className='w-full'/>
            <div className=' p-[10px] '>

            
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                             
                              <th scope="col" className="px-6 py-3">
                                  Patient Name
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Age
                              </th>
                               
                              <th scope="col" className="px-6 py-3">
                                  Date 
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Time
                              </th>
                             
                              <th scope="col" className="px-6 py-3">
                                  Status
                              </th>
                               <th scope="col" className="px-6 py-3">
                                  Desease
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Action
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              appointments && appointments?.map(appointment => {
                                  return (
                                      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                          <td className="px-6 py-4">
                                              {appointment.user.name}
                                          </td>
                                          <td className="px-6 py-4">
                                              {appointment.user.dob}
                                          </td>
                                          <td className="px-6 py-4">
                                            {appointment.scheduledAt.slot_date}
                                          </td>
                                          <td className="px-6 py-4">
                                            {appointment.scheduledAt.slot_time}
                                          </td>
                                          <td className={`px-6 py-4`}>
                                            <p className={`${appointment.status==='consulted'?`text-green-700`:`text-red-700`}`}>{appointment.status==='consulted'?'Consulted':'Not consulted'}</p>
                                          </td>
                                          <td className="px-6 py-4">
                                            
                                          </td>
                                          
                                          <td className="px-6 py-4">
                                            <p onClick={() => {
                                                const onePateint = appointments?.find(appointmnt => appointmnt.user._id === appointment.user._id)
                                                
                                                  setSingleAppointment(onePateint)
                                                  setSingleAppointmentView(true)
                                                  
                                            }}
                                                  className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer">View</p>
                                          </td>
                                      </tr>
                                  )
                              })
                          }



                      </tbody>
                  </table>





              </div>

              </div>
             
        </div>
  )
}

export default AppointmentTable
