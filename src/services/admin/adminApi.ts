import { api } from "../../api/axios";
import { Prescription, UserType } from "../../types/Models";

export const getAppointments=async(filter?:string):Promise<any>=>{
    try {
    // let c='sort=consultingFee-1'
        const res = await api.get(`/admin/appointments?status=${filter?filter:''}`)
        const data = await res.data
        return data
    } catch (error:any) {
        console.log('error : ',error.message);
        return []
    }
}

export const getOnePateintPrescritionsAdmin=async(patientId:string):Promise<any>=>{
    const res = await api.get(`/admin/prescription?patientId=${patientId}`);
    const data:Prescription[] = await res.data
    return data
}
 

export const getAllpatient=async(searchQ?:string,sort?:string):Promise<UserType[]>=>{
    searchQ=searchQ?searchQ:''
    sort=sort?sort:''
    const res = await api.get(`/admin/patients?q=${searchQ}&sort=${sort}`);
    const data:UserType[] = await res.data
    return data
}
 

export const blockOrUnblockPatient=async(id:string,action:string):Promise<any>=>{
    
    const res = await api.patch(`/admin/block-unblock-patient?id=${id}&action=${action}`);
    const data = await res.data
    return data
}
 