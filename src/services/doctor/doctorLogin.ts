import { api } from "../../api/axios";

 
export const DoctorLogin=async(email:string,password:string ):Promise<any>=>{
        const res = await api.post(`/doctor/login`,{
            email,password 
        })
        const data = await res.data
        return data
    
}