export const checkDocterAuth=(error:any)=>{
    if (error?.response?.status === 401 || error?.response?.status === 403) {
        localStorage.removeItem('persist:doctor')
        window.location.href = '/login';
    }
}
export const checkUserAuth=(error:any)=>{
    if (error?.response?.status === 401 || error?.response?.status === 403) {
        console.log(error);
        
        localStorage.removeItem('persist:user')
        window.location.href = '/login';
    }
}