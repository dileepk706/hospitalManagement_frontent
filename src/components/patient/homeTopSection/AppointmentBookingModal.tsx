import React,{useState} from 'react'
import { api } from '../../../api/axios'
import { Button } from "@mui/material";
import { LoadingSpinner } from "../../LodingSpinner";
import { useNavigate } from 'react-router-dom';
import { searchAllDoctorsBy_name_deprtmnt_health } from '../../../services/patients/doctorapi';
import { useAppDispatch } from '../../../redux/hooks';
import { insertDoctors } from '../../../redux/patient/doctorsDataSlicer';
import { changeDepartment } from '../../../redux/patient/doctorSearchParams';
import { checkUserAuth } from '../../../utils/chekAuth';

type AppointmentBookingModalProps={
    setAppntmtBkngModalView:React.Dispatch<React.SetStateAction<boolean>>
}
const  AppointmentBookingModal:React.FC<AppointmentBookingModalProps>=({setAppntmtBkngModalView})=> {

    const disptch=useAppDispatch()
    
    const [healthProblems, setHealthProblems] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [department, setDepartment] = useState<any>()
    const [loading, setIsLoading] = useState(false)
    const [loadingDeprtmnt, setloadingDeprtmnt] = useState(false)

    const navigate=useNavigate()

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

        setInputValue(event.target.value)
        const getHealthProblemHelper = async () => {
            try {
                setIsLoading(true)
                const { data } = await api.get(`healthProblems?q=${event.target.value}`)
                setIsLoading(false)
                setHealthProblems(data)

            } catch (error: any) {
                console.error(error);
                // error?.response?.data?.message && setApiError(error?.response?.data?.message)
                checkUserAuth(error)
            }

        }
        getHealthProblemHelper()
      }
    
      const searchHealthDepartment = async (healthIssue: string) => {
          try {
              setloadingDeprtmnt(true)
              setHealthProblems([])
              const { data } = await api.get(`get-department-by-healt?healthProblem=${healthIssue}`)
              setloadingDeprtmnt(false)
              setDepartment(data)
              setInputValue(healthIssue)

          } catch (error: any) {
              console.error(error);
              // error?.response?.data?.message && setApiError(error?.response?.data?.message)
              checkUserAuth(error)
          }
      }

  return (
      <div className='fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 '>
          <div className='bg-white p-6 py-20 rounded shadow-md w-[60%] relative'>
              <h2 className='text-xl font-semibold mb-4'>Consult with a Doctor</h2>

              <div className="flex flex-col gap-4 w-full">
                  <div className="w-full relative ">
                      <label className="text-gray-600 mb-1">Tell us your symptoms or health problem</label>
                      <div className="w-full border border-gray-600 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring focus:border-blue-500">
                          <input
                              type="text"
                              onChange={handleInputChange}
                              value={inputValue}

                          />
                      </div>

                      <div style={{ boxShadow: '0px 0px 8px #ddd' }} className='absolute  w-full bg-white flex flex-col rounded-lg max-h-40 overflow-auto custom-scrollbar z-50'>

                          {!loading ? healthProblems?.map?.((res: any, id: number) => {
                              return (
                                  <div onClick={() => searchHealthDepartment(res)} className='search-result flex justify-between'  >
                                      <p className='text-sm site-txt-color'>{res}</p>
                                  </div>
                              );
                          }) : (
                              <LoadingSpinner width="w-[2.25rem]" />
                          )}

                      </div>
                  </div>
                  <div>
                      <label className="text-gray-600 mb-1">Speciality</label>

                      <div className="w-full border border-gray-600 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring focus:border-blue-500" >
                          {!loadingDeprtmnt ? department?.departmentName : <LoadingSpinner width="w-[2.25rem]" />}
                      </div>

                  </div>
              </div>

              <div className="mt-8 flex items-center ">
                  {department?.departmentName ? (
                  <Button 
                  onClick={()=>{
                    searchAllDoctorsBy_name_deprtmnt_health('', '',department._id, '', '', '','').then(doctor=>{
                        disptch(changeDepartment(department._id))
                        disptch(insertDoctors(doctor))
                        navigate('/doctors')
                    })

                  }}
                  variant="contained" 
                  size="small">Continue</Button>
                  ) : (
                      <Button size='small' variant="contained" disabled>
                          Continue
                      </Button>)}
              </div>

              <button
                  className='absolute top-0 right-0 p-2 m-2 bg-gray-300 text-gray-700 rounded'
                  onClick={()=>{
                    

                    setAppntmtBkngModalView(false)
                }}
              >
                  Close
              </button>
          </div>
      </div>
  )
}

export default AppointmentBookingModal
