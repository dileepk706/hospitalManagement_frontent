import {configureStore} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import doctorsDataReducer from './patient/doctorsDataSlicer'
import doctorSearchParamsReducer from './patient/doctorSearchParams'
import storage from 'redux-persist/lib/storage';
import doctorReducer from './doctor/doctorSlice'
import adminReducer from './admin/adminSlice'
import pateintReducer from './patient/patientSlice'
import paymentReducer from './patient/paymentSlicer'

const userPersistConfig  = {
    key: 'user',
    storage,
}
const doctorPersistConfig  = {
    key: 'doctor',
    storage,
}
const adminPersistConfig  = {
    key: 'admin',
    storage,
}
const persistedUserReducer = persistReducer(userPersistConfig, pateintReducer)
const presistDoctorReducer=persistReducer(doctorPersistConfig,doctorReducer)
const presistAdminReducer=persistReducer(adminPersistConfig,adminReducer)

export const store=configureStore({
    reducer:{
        doctors:doctorsDataReducer,
        searchParameteres:doctorSearchParamsReducer,
        user:persistedUserReducer,
        doctor:presistDoctorReducer,
        admin:presistAdminReducer,
        payment:paymentReducer
    }
})

const persistor=persistStore(store)
export default persistor
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch