import { api } from "../../api/axios";

export const searchAllDoctorsBy_name_deprtmnt_health=async(sort:string,name:string,department:string,sex:string,gte:string,lte:string,rating:string):Promise<any>=>{
    try {
    // let c='sort=consultingFee-1'
        const res = await api.get(`all-doctor?sort=${sort}&name=${name}&department=${department}&sex=${sex}&gte=${gte}&lte=${lte}&rating=${rating}`)
        const data = await res.data
        return data
    } catch (error:any) {
        console.log('error : ',error.message);
        return []
    }
}