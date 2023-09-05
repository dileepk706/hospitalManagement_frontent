import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { DoctorType } from "../../types/Models";

 
const initialState:DoctorType[]=[]

export const doctorsDataSlice=createSlice({
    name:'doctors',
    initialState,
    reducers:{
        insertDoctors:(state,action:PayloadAction<DoctorType[]>)=>{
            return action.payload
        }
    }
})

export const { insertDoctors } = doctorsDataSlice.actions;
export default doctorsDataSlice.reducer;