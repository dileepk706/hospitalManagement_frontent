import React, { useState, useEffect } from 'react'
import UserTable from '../../doctor/userList/UserTable'
import { UserType } from '../../../types/Models'
import { getAllpatient } from '../../../services/admin/adminApi'
import { checkAdminAuth } from '../../../utils/chekAuth'
import DropDown from '../../dropdown/Dropdown'
import SearchInput from '../../searchBar/SearchInput'

function PatientsWraper() {
  const [patients, setPatients] = useState<UserType[] | null>(null)
  const [searchInpt, setearchinpt] = useState('')
  const [sortCriteria, setSortCriteria] = useState('')
  const [singlePatient, setSinglePatient] = useState<UserType | undefined>(undefined)
  const [singlePatientView, setSinglePatientView] = useState(false)

  const sortOptions = [
    {
      option: 'name A to Z',
      isSelected: false
    },
    {
      option: 'name Z to A',
      isSelected: false
    },
    {
      option: 'age High to Low',
      isSelected: false
    },
    {
      option: 'age Low to High',
      isSelected: false
    }
  ]

  const getSortedData=async (sort:string)=>{
    try {
      setSortCriteria(sort)
      if(sort==='name A to Z'){
        sort='name-1'
      }else if(sort==='name Z to A'){
        sort='name1'

      }else if(sort==='age High to Low'){
        sort='age-1'
        
      }else if(sort==='age Low to High'){
        sort='name1'
        
      }else{
        sort=sort?sort:''
      }
      const patients: UserType[] = await getAllpatient(searchInpt,sort)
      console.log({ patients })
      setPatients(patients)
    } catch (error: any) {
      checkAdminAuth(error)
      // setApiError(error?.response?.data?.message)
      console.log('error : ', error?.response?.status);
    }

  }
  useEffect(() => {

    handleGetPateints()
  }, [])

  const handleGetPateints = async (searchQ?:string,sort?:string) => {
    try {
      searchQ=searchQ?searchQ:''
      sort=sort?sort:''
      setearchinpt(searchQ)
      setSortCriteria(sort)
      const patients: UserType[] = await getAllpatient(searchQ,sortCriteria)
      console.log({ patients })
      setPatients(patients)
    } catch (error: any) {
      checkAdminAuth(error)
      // setApiError(error?.response?.data?.message)
      console.log('error : ', error?.response?.status);
    }
  }
  return (
    <div className='flex flex-col gap-5'>
      <div className="w-full z-10 p-2  sticky top-0 rounded-md flex justify-start gap-5" >
        <SearchInput handleSearch={handleGetPateints} />
        <DropDown 
              name='Sort' 
              options={sortOptions}
              getdataByfilter={getSortedData}
              />
      </div>

      <UserTable patients={patients} isAdmin={true} handleGetPateints={handleGetPateints} setPatients={setPatients} />
    </div>


  )
}

export default PatientsWraper
