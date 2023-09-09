import { api } from "../../api/axios";
import { initialValuesType } from "../../components/admin/doctors/DoctorAddForm";
import { DoctorType, Prescription, UserType } from "../../types/Models";

export const getAppointments=async(filter?:string,page?:number):Promise<any>=>{
    try {
    // let c='sort=consultingFee-1'
        const res = await api.get(`/admin/appointments?status=${filter?filter:''}&page=${page}`)
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
 
export const getAllDoctor=async( name?:string,department?:string,sex?:string,gte?:string,lte?:string,sort?:string):Promise<DoctorType[]>=>{

    name=name?name:''
    department=department?department:''
    sex=sex?sex:''
    gte=gte?gte:''
    lte=lte?lte:''
    sort=sort?sort:''

    const res = await api.get(`/admin/all-doctor?name=${name}&department=${department}&sex=${sex}&gte=${gte}&lte=${lte}&sort=${sort}`);
    const data:DoctorType[] = await res.data
    return data
}

export const getOneDoctor=async( id:string):Promise<DoctorType[]>=>{

    const res = await api.get(`/admin/doctor/${id}`);
    const data:DoctorType[] = await res.data
    return data
}

export const blockOrUnblockDoctor=async(id:string,action:string):Promise<any>=>{
    
    const res = await api.patch(`/admin/block-unblock-doctor?id=${id}&action=${action}`);
    const data = await res.data
    return data
}

export const createDoctor=async(doctor:initialValuesType):Promise<any>=>{
    const res = await api.post(`/admin/add-doctor`,{
        name:doctor.name,
        email:doctor.email,
        phone:doctor.phone,
        dob:doctor.age,
        sex:doctor.sex,
        designation:doctor.education,
        department:doctor.department,
        yearOfExperiance:doctor.experience,
        biography:doctor.biography,
        consultingFee:doctor.fee
    });
    const data = await res.data
    return data
}
export const adminLogin=async(email:string,password:string ):Promise<any>=>{
    const res = await api.post(`/admin/login`,{
        email,password 
    })
    const data = await res.data
    return data

}