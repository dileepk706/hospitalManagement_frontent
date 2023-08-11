import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import PatientHome from '../../pages/patient/PatientHomePage';
import PatientProtected from './PatientProtected';
import ListDoctor from '../../pages/patient/ListDoctors';
import LoginPage from '../../pages/patient/LoginPage';
import { useAppSelector } from '../../redux/hooks';
import BookDoctorSlot from '../../pages/patient/BookingPage';


interface applicationType  {}
 
const PatientRouter:React.FC<applicationType>=()=> {

  const userToken= useAppSelector(state=>state?.user?.accessToken)
  
  return (
    <>
     <Routes>
        <Route path='/login' element={!userToken && <LoginPage />} />
        <Route path='/' element={ <PatientHome />} />
        <Route path='/doctors' element={<ListDoctor />} />
        <Route path='/make-appointment/:id' element={ <BookDoctorSlot /> } /> 
      </Routes>
  </>
  ); 
}
export default PatientRouter;