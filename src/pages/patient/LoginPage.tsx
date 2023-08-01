import Login from "../../components/patient/loginAndsignup/Login"
import {useState} from 'react'
import Signup from "../../components/patient/loginAndsignup/Signup"

const LoginPage=()=>{

    const [isLoginComponent,setIsLoginComponent]=useState(true)

    return(
        <>
        {isLoginComponent?<Login setIsLogin={setIsLoginComponent}/>:<Signup setIsLogin={setIsLoginComponent}/>}
         
        
        </>
       
    )
}

export default LoginPage