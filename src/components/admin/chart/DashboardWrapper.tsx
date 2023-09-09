import DoughnutChart from "./Doughnut"
import Barchart from "./BarChart"
import { useEffect, useState } from "react"
import { api } from "../../../api/axios"
import { checkAdminAuth } from "../../../utils/chekAuth"
import SoftCard from "../../softCards/Card"

export type DashsBoardAllData = {
  patientCountData: PatientData
  doctorCountsByDepartment:docCountData[]
  appointmentDahboard:appointmentData
  revenue:revenue[]
}
type PatientData = {
  totalUsers: number
  maleUsers: number
  femaleUsers: number
  labels: string[]
}
type docCountData={
  count:number
    _id:string
}
type appointmentData = {
  cancelledCount: number
  consultedCount: number
  notConsultedCount: number
  totalConsultingFee: number
  totalCount: number
}
export type revenue= {
  _id: string
  totalConsultingFee: number
}
function DashboardWrapper() {

  const t=localStorage.getItem('persist:admin')
  console.log('accessToken : ',t)
  const [dashsBoardata, setDahBaordData] = useState<DashsBoardAllData | null>(null)

  useEffect(() => {
    fetchDashBoardData()

  }, [])

  const fetchDashBoardData = async () => {
    try {
      const { data } = await api.get('admin/dashboard')
      console.log(data)
      setDahBaordData(data)
    } catch (error: any) {
      checkAdminAuth(error)
      // setApiError(error?.response?.data?.message)
      console.log('error : ', error?.response?.status);
    }
  }

  const doctorCount=dashsBoardata?.doctorCountsByDepartment?.reduce((acc, item) => acc + item.count, 0);
  const doctrCountByDep=dashsBoardata?.doctorCountsByDepartment.map(c=>{
    return c.count
  })
  const docLabels=dashsBoardata?.doctorCountsByDepartment.map(c=>{
    return c._id
  })
  let c=17
  const docBgColors : string[] | undefined=dashsBoardata?.doctorCountsByDepartment.map((e,i)=>{
    c=i!==0?c+80:c
    // return `rgba(${(1*i+1)+''},${(19*i+1)+''},${(243*i+1)+''} , 0.983)`
    return `rgba(${c+''}, 10, 233, 0.983)`

    // 'rgba(29, 10, 233, 0.983)',

  })
  const docDataSets = {
    label: `${doctorCount || '0'}of Doctors`,
    data: doctrCountByDep || [0],
    backgroundColor:docBgColors || ['red'],
    borderColor: docBgColors || ['red'],
    borderWidth: 2,
  }


  const patientdataSets = {
    label: `${dashsBoardata?.patientCountData.totalUsers || '0'}of Patients`,
    data: [dashsBoardata?.patientCountData.maleUsers || 0, dashsBoardata?.patientCountData.femaleUsers || 0],
    backgroundColor: [
      'rgb(181, 10, 233)',
      'rgb(247, 12, 106)',
    ],
    borderColor: [
      'rgb(181, 10, 233)',
      'rgb(247, 12, 106)',
    ],
    borderWidth: 2,
  }
  const patientLabels = ['Male', 'Female']

  const dailyRevenue=dashsBoardata?.revenue.map(e=>{
    return e.totalConsultingFee
  })
  const barChartDataSet = {
    label: `${dashsBoardata?.appointmentDahboard.totalConsultingFee || '0'}`,
    data: dailyRevenue || [0],
    backgroundColor: 'rgba(76, 15, 243, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1,
  }
  const barChartLabel=dashsBoardata?.revenue.map(e=>{
    const dateObj = new Date(e._id);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
    return formattedDate
  })

  return (
    <div className="w-full flex flex-col gap-5 ">
      <h1 className='font-bold text-xl'> Dashsboard </h1>

      <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />

      <div className="flex items-center justify-around">
        <SoftCard
          data={dashsBoardata?.patientCountData.totalUsers || ''}
          title='Total Patients'
          perc={55.67}
        />
        <SoftCard
          data={doctorCount || ''}
          title='Total Doctors'
          perc={30}
        />
         <SoftCard
          data={dashsBoardata?.appointmentDahboard.totalCount || ''}
          title='Total Appointments'
          perc={3}
        />
        <SoftCard
          title={`${dashsBoardata?.appointmentDahboard.cancelledCount} Cancellation `|| ''}
          data={`${dashsBoardata?.appointmentDahboard.consultedCount} Conulted patients`}
        />
         <SoftCard
          data={`₹ ${dashsBoardata?.appointmentDahboard.totalConsultingFee} `|| ''}
          title='Total Revenue'
          perc={23}
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-10 ">
        < div className='flex items-center justify-around gap-5 w-full' >

          <div className="border border-sky-700 rounded-lg w-[35%] ">
            <h1 className="text-center font-bold text-xl text-sky-800 my-5 ">Patients separetion</h1>
          <DoughnutChart
            datasets={patientdataSets}
            labels={patientLabels}

          />
          </div>
          
          <div className="border border-sky-700 rounded-lg w-[35%] ">
          <h1 className="text-center font-bold text-xl text-sky-800 my-5 ">Doctors separetion</h1>

          <DoughnutChart
            datasets={docDataSets}
            labels={docLabels||['']}

          />
          </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-5 border border-sky-700 px-[10%] rounded-lg w-full h-[70%] ' >

          <h1 className="text-center font-bold text-xl text-sky-800 my-5 ">Last 1 month Revenue</h1>

          <Barchart dataset={barChartDataSet} labels={barChartLabel || ['']}/>
        </div>
      </div>

    </div>
  )
}
export default DashboardWrapper

