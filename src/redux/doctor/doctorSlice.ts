import { createSlice } from "@reduxjs/toolkit";

type InitialStateType={
    accessToken:string ;
    doctorName:string
    doctorImage:string
}
const initialState:InitialStateType={
    accessToken:'',
    doctorName:'',
    doctorImage:''
}
export const  doctorSlice=createSlice({
    name:'doctor',
    initialState,
    reducers:{
        updateDoctorCredentials:(state,action)=>{
            state.accessToken=action.payload.accessToken
            state.doctorImage=action.payload.doctorImage
            state.doctorName=action.payload.doctorName
        },
        logoutDoctor:(state,action)=>{
            state.accessToken=''
            state.doctorImage=''
            state.doctorName =''
        }
    }
})

export const {logoutDoctor,updateDoctorCredentials}=doctorSlice.actions
export default doctorSlice.reducer