import { createSlice } from "@reduxjs/toolkit";


type searchParamsType={
    name:string;
    sort:string;
    department:string;
    sex:string;
    gte:string;
    lte:string
}
const initialState:searchParamsType={
    name:'',
    sort:'',
    department:'',
    sex:'',
    gte:'',
    lte:'',
}

//this sliser for change the search params for search, sort, filter be interconnected
//when call the api
export const doctorSearchParamsSlice=createSlice({
    name:'doctorSeachParams',
    initialState,
    reducers:{
        changeName:(state,action)=>{
            state.name=action.payload
        },
        changeSort:(state,action)=>{
            state.sort=action.payload
        },
        changeDepartment:(state,action)=>{
            state.department=action.payload
        },
        changeSex:(state,action)=>{
            state.sex=action.payload
        },
        change_Gte_Lte:(state,action)=>{
            state.gte=action.payload.gte
            state.lte=action.payload.lte
        }
    }
})

export const { changeDepartment,changeName,changeSex,changeSort,change_Gte_Lte } = doctorSearchParamsSlice.actions;
export default doctorSearchParamsSlice.reducer;