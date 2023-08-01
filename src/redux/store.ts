import {configureStore} from '@reduxjs/toolkit'
import doctorsDataReducer from './patient/doctorsDataSlicer'
import doctorSearchParamsReducer from './patient/doctorSearchParams'

const store=configureStore({
    reducer:{
        doctors:doctorsDataReducer,
        searchParameteres:doctorSearchParamsReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch