import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface doctersType {
    name: string;
    biography: string;
    consultingFee: number;
    department: string
    designation: string
    email: string
    image?: string
    isBlocked: boolean
    isMailVarified: boolean
    phone: string
    rating: number
    review:[]
    sex: string
    yearOfExperiance: number
    _id: string
}

const initialState:doctersType[]=[]

export const doctorsDataSlice=createSlice({
    name:'doctors',
    initialState,
    reducers:{
        insertDoctors:(state,action:PayloadAction<doctersType[]>)=>{
            return action.payload
        }
    }
})

export const { insertDoctors } = doctorsDataSlice.actions;
export default doctorsDataSlice.reducer;