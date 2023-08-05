import { api } from "../../api/axios";

export const SearchHealthProblems=async (heathIsue:string):Promise<[]>=>{
    try {
        const {data} = await api.get(`/healthProblems?healthProblem=${heathIsue}`)
        return data 
    } catch (error:any) {
        console.log('error : ',error.message);
        return []
    }
}
export const fetchAllDoctorDepatmentHealthNames=async():Promise<any>=>{
    try {
        const {data} = await api.get(`/get-alldoctor-alldepartment-allhealth`)
        return data
    } catch (error:any) {
        console.log('error : ',error);
        return []
    }
}
export const fetchAllDoctorsBy_name_deprtmnt_health=async(sort:string,name:string,department:string,sex:string,gte:string,lte:string):Promise<any>=>{
    try {
    // let c='sort=consultingFee-1'
        const {data} = await api.get(`/admin/all-doctor?sort=${sort}&name=${name}&department=${department}&sex=${sex}&gte=${gte},&lte=${lte}`)
        return data
    } catch (error:any) {
        console.log('error : ',error.message);
        return []
    }
}
export const fetchAllDoctersByHealthIssue=async(healthIssue:string):Promise<[]>=>{

    try {
        const {data} = await api.get(`get-all-doctors-by-heathIsue?healthProblem=${healthIssue}`)
        return data
    } catch (error:any) {
        console.log(error.message);
        return []
    }
}
