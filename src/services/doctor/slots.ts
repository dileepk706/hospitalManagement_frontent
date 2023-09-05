import { api } from "../../api/axios";
import { Medicine, Prescription } from "../../types/Models";
 
export const CreateSlote=async(startTime:string|null, endTime:string|null, slotDuration:number,slotDate:string|null):Promise<any>=>{
        const res = await api.post(`/doctor/create-slote`,{
            slotDate,startTime, endTime,slotDuration
        })
        const data = await res.data
        return data
}


export const getPatients=async():Promise<any>=>{
    const res = await api.get(`/doctor/patients`)
    const data = await res.data
    return data
}
export const getDoctorInfo=async():Promise<any>=>{
    const res = await api.get(`/doctor/doctor-info`)
    const data = await res.data
    return data
}
export const createPrescrition=async(medicines:Medicine[],patientId:string):Promise<any>=>{
    const res = await api.post('/doctor/prescription', { medicines,patientId});
    const data = await res.data
    return data
}
export const getOnePateintPrescritions=async(patientId:string):Promise<any>=>{
    const res = await api.get(`/doctor/prescription?patientId=${patientId}`);
    const data:Prescription[] = await res.data
    return data
}
 
