import React,{useState,useEffect} from 'react'
import UserTable from '../../doctor/userList/UserTable'
import { UserType } from '../../../types/Models'
import { getAllpatient } from '../../../services/admin/adminApi'
import { checkAdminAuth } from '../../../utils/chekAuth'

export const  PatientListWrapper=() => {
    const [patients, setPatients] = useState<UserType[] | null>(null)
  const [searchInpt, setearchinpt] = useState('')
  const [singlePatient, setSinglePatient] = useState<UserType|undefined>(undefined)
  const [singlePatientView, setSinglePatientView] = useState(false)

  useEffect(() => {

    handleGetPateints()
  }, [])
  const handleGetPateints = async () => {
    try {

      const patients: UserType[] = await getAllpatient()
      setPatients(patients)
    } catch (error: any) {
      checkAdminAuth(error)
      // setApiError(error?.response?.data?.message)
      console.log('error : ', error?.response?.status);
    }
  }
  return (
    <UserTable patients={patients} />

  )
}

