import {createSlice} from '@reduxjs/toolkit'
 
type InitialStateType={
    accessToken:string ;
    userName:string
    userImage:string
    userPhone:string
    userEmail:string
}
const initialState:InitialStateType={
    accessToken:'',
    userName:'',
    userImage:'',
    userPhone:'',
    userEmail:''
}
const patientSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        updateUserCredentials:(state,action)=>{
            state.accessToken=action.payload?.accessToken
            state.userName=action.payload?.userName
            state.userEmail=action.payload?.userEmail
            state.userPhone=action.payload?.userPhone
            state.userImage=action.payload?.userImage
        },
        logoutPateint: (state, action) => {
            state.accessToken = ''
            state.userName =''
            state.userImage=''
        }
    }
})

export const {updateUserCredentials,logoutPateint} = patientSlice.actions;
export default patientSlice.reducer;


// import {createSlice} from '@reduxjs/toolkit'
 
// type InitialStateType={
//     _id:string;
//     accessToken:string | null
//     userName:string;
//     userEmail:string;
//     userImage?:string
// }
// const initialState:InitialStateType={
//     _id:'',
//     accessToken:'',
//     userName:'',
//     userEmail:'',
//     userImage:''
// }
// const patientSlice=createSlice({
//     name:'user',
//     initialState,
//     reducers:{
//         updateUserCredentials:(state,action)=>{
//             state.accessToken=action.payload?.accessToken
//             state.userEmail=action.payload?.userEmail
//             state.userName=action.payload?.userName
//             state._id=action.payload?._id
//             state.userImage=action.payload?.userImage ?action.payload?.userImage:''
//         },
//         logoutPateint:(state,action)=>{
//             state.accessToken=null
//             state.userEmail= ''
//             state.userName='' 
//             state._id='' 
//             state.userImage= ''
//         }
//     }
// })

// export const {updateUserCredentials,logoutPateint} = patientSlice.actions;
// export default patientSlice.reducer;


