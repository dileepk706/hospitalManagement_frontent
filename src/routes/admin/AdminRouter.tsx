import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from '../../pages/admin/adminHomePage';
import AdminProtected from './AdminProtected';
import Drawer from '../../components/admin/sidebar/sideBar';
import AppointmentListPage from '../../pages/admin/AppointmentListPage';
import SinglePatient from '../../components/doctor/userList/SinglePatient';
import PatientsWraper from '../../components/admin/patients/PatientsWraper';

interface applicationType  {}
                          
const AdminRouter:React.FC<applicationType>=()=> {

  return (
    <>
      <Drawer isAdmin={true} />
      <Routes>
        <Route path='/' element={<AdminProtected><AdminHome /></AdminProtected>} />
        <Route path='/appointments' element={<AdminProtected><AppointmentListPage /></AdminProtected>} />
        <Route path='/patients/:userId' element={<AdminProtected><SinglePatient /></AdminProtected>} />
        <Route path='/patients' element={<AdminProtected><PatientsWraper /></AdminProtected>} />
      </Routes>
    </>
  ); 
}
export default AdminRouter;