import React,{useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DoctorHome from '../../pages/doctor/DoctorHomePage';
import DoctorProtected from './DoctorProtected';
import SidebarDoctor from '../../components/doctor/sideBar/Sidebar';

interface applicationType  {}
                          
const DoctorRouter:React.FC<applicationType>=()=> {
  const [isDoctor,setIsDoctor] =useState(false)

  return (
    <BrowserRouter>
    {isDoctor&&<SidebarDoctor/>}
      <Routes>
        <Route path='/doctor' element={<DoctorProtected><DoctorHome /></DoctorProtected>} />
      </Routes>
    </BrowserRouter>
  ); 
}
export default DoctorRouter;