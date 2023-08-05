import React from 'react'
import AddSchedule from '../../components/doctor/schedules/AddSchedule';
type AddSchedulePageProps={

}
const AddSchedulePage:React.FC<AddSchedulePageProps>=()=> {
    return (
        <div className='container mx-auto py-5 flex flex-col relative'>
            <AddSchedule/>
        </div>
    );
  }
  
 export default AddSchedulePage