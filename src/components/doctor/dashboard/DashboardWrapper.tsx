import React,{useState,useEffect} from 'react'
import SoftCard from '../../softCards/Card'
import { DashsBoardAllData } from '../../admin/chart/DashboardWrapper'
import { checkDocterAuth } from '../../../utils/chekAuth'
import { api } from '../../../api/axios'
import { revenue } from '../../admin/chart/DashboardWrapper'
import DoughnutChart from '../../admin/chart/Doughnut'
import BarChart from '../../admin/chart/BarChart'

type dashboardData={
    totalUsers:number;
    maleCount:number;
    femaleCount:number;
    revenueOfSingleDays:revenue[];
    totalRevenue: number;
    canclledAppointments:number;
    cancelRquested:number;
    consulted:number;
    notConsulted:number;
    totalAppointments: number
  }
function DashboardWrapper() {

  const [dashsBoardata, setDahBaordData] = useState<dashboardData | null>(null)

  useEffect(() => {
    fetchDashBoardData()
    
  }, [])

  const fetchDashBoardData = async () => {
    try {
      const res = await api.get('doctor/dashboard')
      const data:dashboardData=await res.data
      setDahBaordData(data)
    } catch (error: any) {
      checkDocterAuth(error)
      // setApiError(error?.response?.data?.message)
      console.log('error : ', error?.response?.status);
    }
  }

  const patientdataSets = {
    label: `${dashsBoardata?.totalUsers || '0'}of Patients`,
    data: [dashsBoardata?.maleCount || 0, dashsBoardata?.femaleCount || 0],
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

  const appointmentdataSets = {
    label: `${dashsBoardata?.totalAppointments || '0'}of Patients`,
    data: [dashsBoardata?.canclledAppointments || 0,
         dashsBoardata?.cancelRquested || 0,
         dashsBoardata?.consulted || 0,
         dashsBoardata?.notConsulted || 0,

        ],
    backgroundColor: [
      'rgb(122, 0, 47)',
      'rgb(83, 12, 247)',
      'rgb(12, 163, 7)',
      'rgb(247, 184, 12)',

    ],
    borderColor: [
    ],
    borderWidth: 2,
  }
  const dailyRevenue=dashsBoardata?.revenueOfSingleDays.map(e=>{
    return e.totalConsultingFee
  })
  const barChartDataSet = {
    label: `${dashsBoardata?.totalRevenue || '0'}`,
    data: dailyRevenue || [0],
    backgroundColor: 'rgba(76, 15, 243, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1,
  }
  const barChartLabel=dashsBoardata?.revenueOfSingleDays.map(e=>{
    const dateObj = new Date(e._id);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
    return formattedDate
  })

  const appointmentLabels=['cancelled','cancell requested','consulted','not consulted']
  const patientLabels = ['Male', 'Female']

  return (
    <div className="w-full flex flex-col gap-5 ">
    <h1 className='font-bold text-xl'> Dashsboard </h1>

    <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />

    <div className="flex items-center justify-around">
      <SoftCard
        data={dashsBoardata?.totalUsers || ''}
        title='Total Patients'
        perc={55.67}
      />
      <SoftCard
        data={dashsBoardata?.totalRevenue || ''}
        title='Total Revenue'
        perc={55.67}
      />
      <SoftCard
        data={dashsBoardata?.totalAppointments || ''}
        title='Total Appointments'
        perc={55.67}
      />
      <SoftCard
        data={dashsBoardata?.notConsulted || ''}
        title='New Appointments'
        perc={55.67}
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
          <h1 className="text-center font-bold text-xl text-sky-800 my-5 ">Appointment separetion</h1>

          <DoughnutChart
            datasets={appointmentdataSets}
            labels={appointmentLabels||['']}

          />
          </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-5 border border-sky-700 px-[10%] rounded-lg w-full h-[70%] ' >

          <h1 className="text-center font-bold text-xl text-sky-800 my-5 ">Last 1 month Revenue</h1>

          <BarChart dataset={barChartDataSet} labels={barChartLabel || ['']}/>
        </div>
      </div>

  </div>
  )
}

export default DashboardWrapper
