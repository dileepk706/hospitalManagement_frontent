import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from '../../pages/admin/adminHomePage';
import AdminProtected from './AdminProtected';
import Drawer from '../../components/admin/sidebar/sideBar';
import AppointmentListPage from '../../pages/admin/AppointmentListPage';
import SinglePatient from '../../components/doctor/userList/SinglePatient';
import PatientsWraper from '../../components/admin/patients/PatientsWraper';
import DoctorListPage from '../../pages/admin/DoctorListPage';
import DoctorProfilePage from '../../pages/admin/DoctorProfilePage';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import AddDoctorPage from '../../pages/admin/AddDoctorPage';
import { useAppSelector } from '../../redux/hooks';
import LoginPageAdmin from '../../pages/admin/LoginPageAdmin';

interface applicationType  {}
                          
const AdminRouter:React.FC<applicationType>=()=> {
  const adminToken = localStorage.getItem('admintoken')


  return (
    <>
      <Drawer isAdmin={true} />
      <Routes>
        {/* <Route path='/login' element={ !adminToken&& <LoginPageAdmin />} /> */}

        <Route path='/' element={<AdminProtected><AdminDashboard /></AdminProtected>} />
        <Route path='/appointments' element={<AdminProtected><AppointmentListPage /></AdminProtected>} />
        <Route path='/patients/:userId' element={<AdminProtected><SinglePatient /></AdminProtected>} />
        <Route path='/patients' element={<AdminProtected><PatientsWraper /></AdminProtected>} />
        <Route path='/doctors' element={<AdminProtected><DoctorListPage /></AdminProtected>} />
        <Route path='/doctors/:id' element={<AdminProtected><DoctorProfilePage /></AdminProtected>} />
        <Route path='/add-doctors' element={<AdminProtected><AddDoctorPage /></AdminProtected>} />

        
      </Routes>
    </>
  ); 
}
export default AdminRouter;