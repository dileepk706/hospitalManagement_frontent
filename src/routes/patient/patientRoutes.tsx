import React,{useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PatientHome from '../../pages/patient/PatientHomePage';
import PatientProtected from './PatientProtected';
import Sidebar from '../../components/patient/sideBar/SideBar'
import ListDoctor from '../../pages/patient/ListDoctors';
import LoginPage from '../../pages/patient/LoginPage';

interface applicationType  {}
                          
const PatientRouter:React.FC<applicationType>=()=> {

  const [isPatient,setIsPatient] =useState(true)
  
  return (
    <BrowserRouter>
    {/* {isPatient && } */}
      <Routes>
        <Route path='/' element={<PatientProtected><PatientHome /></PatientProtected>} />
        <Route path='/doctors' element={<PatientProtected><ListDoctor /></PatientProtected>} />
        <Route path='/login' element={<PatientProtected><LoginPage /></PatientProtected>} />

      </Routes>
    </BrowserRouter>
  ); 
}
export default PatientRouter;