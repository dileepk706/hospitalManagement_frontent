import { api } from "../../api/axios";

export const loginWithGoogle=async(email:string,name:string,picture:string):Promise<any>=>{
    try {
    // let c='sort=consultingFee-1'
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