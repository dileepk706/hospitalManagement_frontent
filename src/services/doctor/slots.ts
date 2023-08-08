import { api } from "../../api/axios";

 
export const CreateSlote=async(startTime:string|null, endTime:string|null, slotDuration:number,slotDate:string|null,doctorid:string):Promise<any>=>{
        const res = await api.post(`/doctor/create-slote`,{
            doctorid,slotDate,startTime, endTime,slotDuration
        })
        const data = await res.data
        return data
}