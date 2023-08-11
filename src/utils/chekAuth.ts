export const checkDocterAuth=(error:any)=>{
    if (error?.response?.status === 401 || error?.response?.status === 403) {
        localStorage.removeItem('persist:doctor')
        window.location.href = '/login';
      }
}