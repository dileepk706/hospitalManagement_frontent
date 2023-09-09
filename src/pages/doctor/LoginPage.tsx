import React from 'react'
import Drawer from "../../components/doctor/sideBar/Sidebar";
import Login from '../../components/doctor/login/Login';
type AdminLoginPageProps={

}
const LoginPageDoctor:React.FC<AdminLoginPageProps>=()=> {
    return (
      <>
      <Login/>
       </>
    );
  }
  
 export default LoginPageDoctor