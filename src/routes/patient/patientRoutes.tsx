import React,{useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PatientHome from '../../pages/patient/PatientHomePage';
import PatientProtected from './PatientProtected';
import ListDoctor from '../../pages/patient/ListDoctors';
import LoginPage from '../../pages/patient/LoginPage';
import { useAppSelector } from '../../redux/hooks';
import Sidebar from '../../components/patient/sideBar/SideBar'

interface applicationType  {}
 
const PatientRouter:React.FC<applicationType>=()=> {

  const userToken= useAppSelector(state=>state?.user?.accessToken)
  
  return (
    <>
    <Sidebar />
     <Routes>
        <Route path='/' element={<PatientProtected><PatientHome /></PatientProtected>} />
        <Route path='/doctors' element={<PatientProtected><ListDoctor /></PatientProtected>} />
        <Route path='/login' element={ !userToken && <LoginPage />  } /> 
      </Routes>
  </>
  ); 
}
export default PatientRouter;