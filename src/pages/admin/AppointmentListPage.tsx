import React from 'react'
import AppointmentListWrapper from '../../components/admin/appointment/AppointmentListWrapper';
type AddSchedulePageProps={

}
const AppointmentListPage:React.FC<AddSchedulePageProps>=()=> {
    return (
        <div className='container mx-auto py-5 flex flex-col relative'>
            <AppointmentListWrapper/>
        </div>
    );
  }
  
 export default AppointmentListPage