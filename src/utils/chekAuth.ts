export const checkDocterAuth=(error:any)=>{
    if (error?.response?.status === 401 || error?.response?.status === 403) {
        
        localStorage.removeItem('doctortoken')
        window.location.href = '/doctor/login';
    }
}

export const checkUserAuth=(error:any)=>{
    if (error?.response?.status === 401 || error?.response?.status === 403) {
        console.log(error);
        
        localStorage.removeItem('persist:user')
        window.location.href = '/login';
    }
}
export const checkAdminAuth=(error:any)=>{
    if (error?.response?.status === 401 || error?.response?.status === 403) {
        console.log(error);
        localStorage.removeItem('admintoken')
        window.location.href = '/admin/login';
    }
}

export const removeDuplicates = (arr:any) => {
    const strArr = arr.map((obj:any) => JSON.stringify(obj));
    const uniq = [...new Set(strArr)].map((u:any) => JSON.parse(u));
    return uniq;
  };