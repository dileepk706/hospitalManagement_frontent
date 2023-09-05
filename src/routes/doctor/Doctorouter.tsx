import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DoctorHome from '../../pages/doctor/DoctorHomePage';
import DoctorProtected from './DoctorProtected';
import LoginPage from '../../pages/doctor/LoginPage';
import { useAppSelector } from '../../redux/hooks';
import Drawer from "../../components/doctor/sideBar/Sidebar";
import AddSchedulePage from '../../pages/doctor/AddSchedule';
import PatientListing from '../../pages/doctor/PatientListing';
import Appointments from '../../pages/doctor/Appointments';
import ProfilePage from '../../pages/doctor/ProfilePage';
import VideoCall from '../../pages/patient/VideoCall';
import SinglePatient from '../../components/doctor/userList/SinglePatient';
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
        <Route path='/patients' element={<DoctorProtected><PatientListing /></DoctorProtected>} />
        <Route path='/patients/:userId' element={<DoctorProtected><SinglePatient /></DoctorProtected>} />
        <Route path='/appointments' element={<DoctorProtected><Appointments /></DoctorProtected>} />
        <Route path='/profile' element={<DoctorProtected><ProfilePage /></DoctorProtected>} />
        <Route path='/room' element={<DoctorProtected><VideoCall /></DoctorProtected>} />
        <Route path='/call/:role/:room/:doc/:user' element={<DoctorProtected>< VideoCall/></DoctorProtected>} />
      </Routes>
    </>
  );
}
export default DoctorRouter;