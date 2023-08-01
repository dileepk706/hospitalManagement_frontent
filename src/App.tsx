import './App.css';
import React from 'react';
import PatientRouter from './routes/patient/patientRoutes';
import DoctorRouter from './routes/doctor/Doctorouter';
import AdminRouter from './routes/admin/AdminRouter';
// import dotenv  from "dotenv";
// dotenv.config()

interface applicationType  {}

const App:React.FC<applicationType>=()=> {
  
  return (
    <>
    
      <PatientRouter />
      <DoctorRouter />
      <AdminRouter />
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