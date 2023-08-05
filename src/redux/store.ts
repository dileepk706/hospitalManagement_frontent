import {configureStore} from '@reduxjs/toolkit'
import doctorsDataReducer from './patient/doctorsDataSlicer'
import doctorSearchParamsReducer from './patient/doctorSearchParams'
import doctorReducer from './doctor/doctorSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import pateintReducer from './patient/patientSlice'

const userPersistConfig  = {
    key: 'user',
    storage,
}
const doctorPersistConfig  = {
    key: 'doctor',
    storage,
}

const persistedUserReducer = persistReducer(userPersistConfig, pateintReducer)
const presistDoctorReducer=persistReducer(doctorPersistConfig,doctorReducer)

export const store=configureStore({
    reducer:{
        doctors:doctorsDataReducer,
        searchParameteres:doctorSearchParamsReducer,
        user:persistedUserReducer,
        doctor:presistDoctorReducer
    }
})

const persistor=persistStore(store)
export default persistor
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch