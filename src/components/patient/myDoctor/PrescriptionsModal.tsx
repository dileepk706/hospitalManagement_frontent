

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DoctorType, Prescription, slots } from '../../../types/Models'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { chekout } from '../../../services/patients/patientLogin';
import { checkDocterAuth, checkUserAuth } from '../../../utils/chekAuth';
import { Description } from '@mui/icons-material';
import { api } from '../../../api/axios';
import PrescrptnSingleModal from '../../doctor/prescription/PrescrptnSingleModal';

type PrescriptionsModalProps = {
    modalVisibleHelper: () => void
    hide: any
    doctorId: string
}
const PrescriptionsModal: React.FC<PrescriptionsModalProps> = ({ modalVisibleHelper, hide, doctorId }) => {
    const [isLoading, setisLoading] = useState<boolean>(false)
    const [prescriptions, setPrescription] = useState<Prescription[] | null>(null)
    const [prescrptnSingleModalOpen,setPrescrptnSingleModalOpen]=useState(false)
    const [singlePrescription,setSinglePrescription]=useState<Prescription|undefined>(undefined)

    useEffect(() => {
        getPrescriotions()
    }, [])
    const getPrescriotions = async () => {
        try {
            setisLoading(true)
            const res = await api.get(`prescriptions?doctorId=${doctorId}`)
            const data: Prescription[] = await res.data
            setPrescription(data)
            console.log(data)
        } catch (error: any) {
            console.error(error);
            checkUserAuth(error)
        }
    };

    return (
        <>
        <div className='flex justify-center items-center w-screen h-screen fixed'>
            <div className='relative w-full h-screen'>
                <motion.div
                    initial={{ x: 1500 }}
                    animate={hide}
                    transition={{ duration: 0.6 }}
                    className="w-[70%] h-[80vh] absolute rounded-lg shadow-lg shadow-black bg-white bg-gradient-to-b z-10 top-[5%] left-[11%]"
                >

                    <h5 className="text-xl text-center mt-[4%] font-bold leading-none txt-them dark:text-white">prescriptions </h5>
                    <hr />
                    <div className='w-full h-full flex flex-col gap-3  items-center  '>

                        <button
                            className='absolute top-0 right-0 p-2 m-2 bg-gray-300 text-gray-700 rounded'
                            onClick={modalVisibleHelper}
                        >
                            Close
                        </button>


                        <div className="w-full h-[80%]  overflow-y-scroll max-w-lg p-1 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                            <div className=" w-full ">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {
                                        prescriptions?.map((e, i) => (
                                            <li className="py-3 sm:py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <Description />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            Prescription ID : {e.prescriptionNumber}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            {e.date}
                                                        </p>
                                                    </div>
                                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        <p 
                                                        onClick={()=>{
                                                            setSinglePrescription(e)
                                                            setPrescrptnSingleModalOpen(true)
                                                        }}
                                                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" >
                                                            View
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }



                                </ul>
                            </div>
                        </div>







                    </div>
                </motion.div>
            </div>
        </div>

        {
            prescrptnSingleModalOpen&&(
                <PrescrptnSingleModal
                setPrescrptnSingleModalOpen={setPrescrptnSingleModalOpen}
                singlePrescription={singlePrescription}
                />
            )
        }
       
        </>
    )
}

export default PrescriptionsModal
