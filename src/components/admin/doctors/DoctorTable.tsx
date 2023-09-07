import React from 'react'
import { DoctorType, UserType } from '../../../types/Models'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { blockOrUnblockDoctor, blockOrUnblockPatient } from '../../../services/admin/adminApi'
import { checkDocterAuth } from '../../../utils/chekAuth'

type DoctorTableProps={
    doctors: DoctorType[] | null
    setDoctor?: React.Dispatch<React.SetStateAction<DoctorType[] | null>>
}

const  DoctorTable:React.FC<DoctorTableProps>=({doctors,setDoctor})=> {

    const navigate=useNavigate()

    const blockDoctorHanlder=async (id:string,block:boolean,doc:DoctorType,indx:number)=>{

      const action=block?'unblock':'block'

      try {
        const message= await blockOrUnblockDoctor(id,action)
        // const Patient={...patient,isBlocked:message==='User blocked succesfully'?true:false}
        const updatedDoctor=doctors?.map((e,i)=>{
          if(indx===i){
            return {...doc,isBlocked:action==='unblock'?false:true}
          }else{
            return e
          }
        })
        if(updatedDoctor && setDoctor){

            setDoctor(updatedDoctor)
        }
        
      
      } catch (error: any) {
        checkDocterAuth(error)
        // setApiError(error?.response?.data?.message)
        console.log('error : ', error?.response?.status);
      }
    }
  return (
    
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>

                <th scope="col" className="px-6 py-3">
                  Fee
                </th>
                <th scope="col" className="px-6 py-3">
                  Department
                </th>
                <th scope="col" className="px-6 py-3">
                Designation
                </th>
                <th scope="col" className="px-6 py-3">
                Experience
                </th>
                
                <th scope="col" className="px-6 py-3">
                  Block or Unblock
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                doctors && doctors?.map((patient,i) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {patient.name}
                      </th>
                       
                      <td className="px-6 py-4">
                        {patient.dob}
                      </td>
                      <td className="px-6 py-4">
                        {patient.phone}
                      </td>
                      <td className="px-6 py-4">
                        {patient.email}
                      </td>
                      <td className="px-6 py-4">
                        {patient.sex}
                      </td>
                      <td className="px-6 py-4">
                        {patient.consultingFee}
                      </td>
                      <td className="px-6 py-4">
                        {patient.department.departmentName}
                      </td>
                      <td className="px-6 py-4">
                        {patient.designation}
                      </td>
                      <td className="px-6 py-4">
                        {patient.yearOfExperiance}
                      </td>
                          <td className="px-6 py-4">
                            <Button
                            onClick={()=>blockDoctorHanlder(patient._id,patient.isBlocked,patient,i)}
                             variant='contained' size='small' color={patient.isBlocked?`primary`:`error`} >
                              
                                {patient.isBlocked?`Unblock`:`Block`}
                            </Button>
                          </td>
                      
                      <td className="px-6 py-4">
                        <p onClick={() => {
                          navigate(`${patient._id}`)
                        }} 
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</p>
                      </td>
                    </tr>
                  )
                })
              }



            </tbody>
          </table>





        </div>
  )
}

export default DoctorTable
