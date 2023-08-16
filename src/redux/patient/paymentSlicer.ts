import { createSlice } from "@reduxjs/toolkit";

const paymentSlice=createSlice({
    name:'paymentStatus',
    initialState:{status:false},
    reducers:{
        changePaymentStatus:(state,action)=>{
            state.status=action.payload
        }
    }
})

export const {changePaymentStatus} =paymentSlice.actions;
export default paymentSlice.reducer;