import { createSlice } from "@reduxjs/toolkit";

type InitialStateType={
    accessToken:string ;
    adminName:string
    adminImage:string
}
const initialState:InitialStateType={
    accessToken:'',
    adminName:'',
    adminImage:''
}
export const  adminSlice=createSlice({
    name:'doctor',
    initialState,
    reducers:{
        updateAdminCredentials:(state,action)=>{
            state.accessToken=action.payload.accessToken
            state.adminName=action.payload.doctorImage
            state.adminImage=action.payload.doctorName
        },
        logoutAdmin:(state,action)=>{
            state.accessToken=''
            state.adminImage=''
            state.adminName =''
        }
    }
})

export const {logoutAdmin,updateAdminCredentials}=adminSlice.actions
export default adminSlice.reducer