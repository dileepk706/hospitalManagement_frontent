import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DoctorHome from '../../pages/doctor/DoctorHomePage';
import DoctorProtected from './DoctorProtected';
import LoginPage from '../../pages/doctor/LoginPage';
import { useAppSelector } from '../../redux/hooks';
import Drawer from "../../components/doctor/sideBar/Sidebar";
import AddSchedulePage from '../../pages/doctor/AddSchedule';
interface applicationType  {}
                          
const DoctorRouter:React.FC<applicationType>=()=> {
  const doctorToken= useAppSelector(state=>state?.doctor?.accessToken)
  

  return (
    <>
      <Drawer />
      <Routes>
        <Route path='/login' element={!doctorToken && <LoginPage />} />
        <Route path='/' element={<DoctorProtected><DoctorHome /></DoctorProtected>} />
        <Route path='/add-schedule' element={<DoctorProtected><AddSchedulePage /></DoctorProtected>} />
        
      </Routes>
    </>
  );
}
export default DoctorRouter;