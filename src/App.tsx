import './App.css';
import React from 'react';
import PatientRouter from './routes/patient/patientRoutes';
import DoctorRouter from './routes/doctor/Doctorouter';
import AdminRouter from './routes/admin/AdminRouter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';
import LoginPage from './pages/patient/LoginPage';
import LoginPageDoctor from './pages/doctor/LoginPage';
import LoginPageAdmin from './pages/admin/LoginPageAdmin';

// import dotenv  from "dotenv";
// dotenv.config()

interface applicationType  {}

const App:React.FC<applicationType>=()=> {
  
  const userToken= localStorage.getItem('usertoken')
  const doctorToken=  localStorage.getItem('doctortoken')
  const adminToken = localStorage.getItem('admintoken')

  return (
    <>
  
    <Router>
     
      <Routes>
        <Route path='/*' element={ <PatientRouter />} />
        <Route path='/doctor/*' element={<DoctorRouter />} />
        <Route path='/admin/*' element={ <AdminRouter />} />
        <Route path='/login' element={!userToken && <LoginPage />} />
        <Route path='/doctor/login' element={!doctorToken && <LoginPageDoctor />} />
        <Route path='/admin/login' element={!adminToken && <LoginPageAdmin />} />
  

      </Routes>
    </Router>
      
    </>
  ); 
}
export default App;

      
     
// <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<PatientProtected><UserHome /></PatientProtected>} />
//         <Route path='/doctor' element={<DoctorProtected><DoctorHomePage/></DoctorProtected>}/>
//         <Route path='/admin' element={<AdminProtected><AdminHomePage /></AdminProtected>} />
//       </Routes>
//     </BrowserRouter>