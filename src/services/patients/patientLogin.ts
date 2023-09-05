import { api } from "../../api/axios";
import { DoctorType, UserType } from "../../types/Models";

 
export const loginWithGoogle=async(email:string,name:string,picture:string):Promise<any>=>{
    try {
        const res = await api.post(`login-googleAuth`,{
            email,name,picture
        })
        const data = await res.data
        return data
    } catch (error:any) {
        console.log('error : ',error.message);
        return []
    }
}

export const userSignup = async (email: string, name: string, password: string): Promise<any> => {
    const res = await api.post('signup', {
        email, name, password
    })
    const data = await res.data
    return data
}

export const userLogin=async(email:string,password:string) :Promise<any>=>{
    const res = await api.post('login', {
        email,password
    })
    const data = await res.data
    return data
}
export const chekout=async(price:number,doctor:string,doctorId?:string,slotId?:string): Promise<any>=>{
    const res = await api.post("create-checkout-session",{  price , doctor ,doctorId,slotId } )
    const { url } = await res.data;
    return url
}
export const bookSlote=async(doctorId?:string,slotId?:string,consultingFee?:number): Promise<any>=>{
    const res = await api.post("/book-slot",{doctorId,slotId,consultingFee } )
    const data = await res.data;
    return data
}
export const getAllAppointments=async(): Promise<any>=>{
    const res = await api.get("/appointments")
    const data = await res.data;
    return data
}

export const getUerInfo=async(): Promise<UserType>=>{
    const res = await api.get("profile")
    const data = await res.data;
    return data
}

export const updateUser=async(name?:string, email?:string,age?:string,phone?:string,sex?:string): Promise<UserType>=>{
    console.log('age : ',age);
    
    const res = await api.post("/edit-profile",{
        name,email,age,phone,sex
    })
    const data = await res.data;
    return data
}

export const editAppointmentStatus=async(id:string):Promise<any>=>{
    const {data}=await api.put('edit-appointment-status', { id}) 
    return data
}

export const addReviewRating=async(rating:number,review:string,doctor:string):Promise<DoctorType>=>{
    const res=await api.put('review-rating', { rating,review,doctor}) 
    const data:DoctorType=await res.data
    return data
}