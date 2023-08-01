import axios from "axios";

const BASE_URL='http://localhost:5000'

export const api = axios.create({
    baseURL:BASE_URL
})

// api.interceptors.request.use(
//     (config)=>{
//       let token=localStorage.getItem('user')
//       let admin=localStorage.getItem('admin')
      
      
//       if(token) config.headers['accessToken']=token
//       if(admin) config.headers['adminaccesstoken']=admin
      
      
//       return config
//     },
//     (error) => {

//       return Promise.reject(error)
//     }
//   )
