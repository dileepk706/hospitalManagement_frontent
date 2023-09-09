import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'http://localhost:5000'

export const api = axios.create({
  baseURL: BASE_URL
})

api.interceptors.request.use(
  (config) => {
    // const doctorCredentials: any = localStorage.getItem('persist:doctor')
    // const doctorCredentialObject = JSON.parse(doctorCredentials)
    // const doctorToken = doctorCredentialObject?.accessToken.replace(/^"(.*)"$/, '$1');
    const doctorToken=localStorage.getItem('doctortoken')
    const adminToken=localStorage.getItem('admintoken')

    
    const userCredentials: any = localStorage.getItem('persist:user')
    const userCredentialsObject = JSON.parse(userCredentials)
    const userToken = userCredentialsObject?.accessToken.replace(/^"(.*)"$/, '$1');
    // const adminCredentials: any = localStorage.getItem('persist:admin')
    // const adminCredentialsObject = JSON.parse(adminCredentials)
    // const adminToken = adminCredentialsObject?.accessToken.replace(/^"(.*)"$/, '$1');
    if(userToken){
      config.headers['accessToken'] = `Bearer ${userToken}`;
    }
    if(doctorToken){
      config.headers['accessTokenDoctor'] = `Bearer ${doctorToken}`;
    }
    if(adminToken){
      config.headers['accessTokenAdmin'] = `Bearer ${adminToken}`;
    }


    return config
  },
  (error) => {

    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
  

    return response;
  },
  (error: any) => {
    
    return Promise.reject(error)
  }
);