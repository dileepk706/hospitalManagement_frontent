import React, { useState, useEffect } from 'react'
import { Prescription, UserType } from '../../../types/Models'
import PrescrptnCrtModal from './PrescrptnCrtModal'
import { getOnePateintPrescritions } from '../../../services/doctor/slots'
import { checkAdminAuth, checkDocterAuth } from '../../../utils/chekAuth'
import PrescrptnSingleModal from '../prescription/PrescrptnSingleModal'
import { Button } from '@mui/material'
import { api } from '../../../api/axios'
import { useParams, useLocation } from 'react-router-dom'
import { getOnePateintPrescritionsAdmin } from '../../../services/admin/adminApi'


type SinglePatientProps = {
    isAdmin?: boolean
}

const SinglePatient: React.FC<SinglePatientProps> = ({ isAdmin }) => {

    const { pathname } = useLocation();
    const { userId } = useParams();
    const [prescrptnCreatModalOpen, setPrescrptnCreatModalOpen] = useState(false)
    const [prescrptnSingleModalOpen, setPrescrptnSingleModalOpen] = useState(false)
    const [prescriptions, setPrescrptions] = useState<Prescription[] | undefined>(undefined)
    const [singlePrescription, setiSinglePrescrption] = useState<Prescription | undefined>(undefined)
    const [singlePatient, setSinglePatient] = useState<UserType | undefined>()
    useEffect(() => {
        getOnePateintHandler()
        getOnePateintPrescritionsHandler()
    }, [])

    const getOnePateintHandler = async () => {
        try {
            const url = pathname === `/doctor/patients/${userId}` ? '/doctor/patient/' : '/admin/patient/'
            const res = await api.get(`${url}${userId}`)
            const user: UserType | undefined = await res.data
            setSinglePatient(user)
        } catch (error: any) {
            pathname === `/doctor/patients/${userId}` ? checkDocterAuth(error) : checkAdminAuth(error)

            // setApiError(error?.response?.data?.message)
            console.log('error : ', error?.response?.status);
        }
    }

    const getOnePateintPrescritionsHandler = async () => {
        try {
            let prescrptins
            if (pathname === `/doctor/patients/${userId}`) {
                prescrptins = await getOnePateintPrescritions(userId || '')
            } else {
                prescrptins = await getOnePateintPrescritionsAdmin(userId || '')
            }

            setPrescrptions(prescrptins)
        } catch (error: any) {
            pathname === `/doctor/patients/${userId}` ? checkDocterAuth(error) : checkAdminAuth(error)

            // setApiError(error?.response?.data?.message)
            console.log('error : ', error?.response?.status);
        }
    }

    const prescriptionSingleViewHandler = (prescription: Prescription) => {
        setiSinglePrescrption(prescription)
        setPrescrptnSingleModalOpen(true)
    }
    return (
        <div className="w-full h-screen p-4 bg-gray-50">
            <div className="flex items-center mb-4">
                <div className="w-1/6">
                    <img src="https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=841&q=80" alt="Profile" className="w-full  rounded-full " />
                </div>
                <div className="w-5/6 ml-4">

                    <div className="flex justify-between items-center my-[10px] ">
                        <h3 className="text-xl font-semibold txt-them ">{singlePatient?.name}</h3>
                        {pathname === `/doctor/patients/${userId}` && (
                            <div className='flex gap-4 items-center'>
                                <button
                                    onClick={() => {
                                        setPrescrptnCreatModalOpen(true)
                                    }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Write a Prescription</button>
                                {/* <button
                                onClick={() => {
                                    setSinglePatientView(false)
                                }}
                                className='bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 '>Back</button> */}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between mt-[8%] ">
                        <div className='flex flex-col gap-2'>
                            <div className="flex items-center justify-start gap-2 ">
                                <h5 className="text-lg font-medium">Age : </h5>
                                <h5 className="text-sm text-gray-600"> {singlePatient?.dob}</h5>
                            </div>
                            <div className="flex items-center justify-start  gap-2 ">
                                <h5 className="text-lg font-medium">Email : </h5>
                                <h5 className="text-sm text-gray-600"> {singlePatient?.email}</h5>
                            </div>

                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className="flex items-center justify-start  gap-2 ">
                                <h5 className="text-lg font-medium">Gender :</h5>
                                <h5 className="text-sm text-gray-600">{singlePatient?.sex}</h5>
                            </div>
                            <div className="flex items-center justify-start  gap-2">
                                <h5 className="text-lg font-medium">Phone :  </h5>
                                <h5 className="text-sm text-gray-600">{singlePatient?.phone}</h5>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2' >

                            <div className="flex items-center justify-start  gap-2">
                                <h5 className="text-lg font-medium">Desease : </h5>
                                <h5 className="text-sm text-gray-600">{singlePatient?.desease}</h5>
                            </div>
                            <div className="flex items-center justify-start  gap-2  ">
                                <h5 className="text-lg font-medium">Address :</h5>
                                <h5 className="text-sm text-gray-600">54 Av, Nr 56 Arondement 3 - Paris</h5>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="flex mt-[10%] ">
                <div className="w-3/5 mr-4">
                    <div className="mb-2">
                        <h2 className="text-lg font-semibold txt-them ">Prescriptions</h2>
                    </div>
                    <div className="space-y-2 bg-white">

                        {
                            prescriptions?.map((e, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between p-4 border-gray-300 rounded-lg shadow-md">
                                    <h4 className="text-md ">Prescription <b className='txt-them'>{e.prescriptionNumber}</b></h4>
                                    <div className='flex items-center gap-5'>
                                        <h6 className="text-sm text-gray-600">Date : {e.date}</h6>
                                        <Button
                                            onClick={() => {
                                                prescriptionSingleViewHandler(e)
                                            }}
                                            variant='outlined'
                                            color='primary'
                                            size='small'
                                        >
                                            View
                                        </Button>

                                    </div>
                                </div>
                            ))
                        }



                    </div>
                </div>

                <div className="w-2/5">
                    <div className="mb-2">
                        <h2 className="text-lg font-semibold txt-them">Payments</h2>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between p-4 border-gray-300 rounded-lg shadow-md">
                            <h5 className="text-md font-medium">₹500.00</h5>
                            <h6 className="text-sm text-gray-600">20/03/2035</h6>
                        </div>
                        <div className="flex justify-between p-4 border-gray-300 rounded-lg shadow-md">
                            <h5 className="text-md font-medium">₹500.00</h5>
                            <h6 className="text-sm text-gray-600">20/03/2035</h6>
                        </div>
                        <div className="flex justify-between p-4 border-gray-300 rounded-lg shadow-md">
                            <h5 className="text-md font-medium">₹500.00</h5>
                            <h6 className="text-sm text-gray-600">20/03/2035</h6>
                        </div>

                    </div>
                </div>
            </div>

            {
                prescrptnCreatModalOpen && (
                    <PrescrptnCrtModal
                        singlePatient={singlePatient}
                        setPrescrptnModalOpen={setPrescrptnCreatModalOpen}
                        prescriptions={prescriptions}
                        setPrescrptions={setPrescrptions}
                        getOnePateintPrescritionsHandler={getOnePateintPrescritionsHandler}
                    />
                )
            }

            {
                prescrptnSingleModalOpen && (

                    <PrescrptnSingleModal
                        singlePrescription={singlePrescription}
                        setPrescrptnSingleModalOpen={setPrescrptnSingleModalOpen}
                        setiSinglePrescrption={setiSinglePrescrption}
                    />
                )
            }



        </div>
    )
}

export default SinglePatient
