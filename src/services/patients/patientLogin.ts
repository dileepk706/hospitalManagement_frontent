import { api } from "../../api/axios";

 
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

export const userLogin=async(email:string,password:string)=>{
    const res = await api.post('login', {
        email,password
    })
    const data = await res.data
    return data
}