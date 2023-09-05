import React, { useState } from 'react'
import { Medicine, Prescription, UserType } from '../../../types/Models'
import { api } from '../../../api/axios';
import { Button } from '@mui/material';
import { checkDocterAuth } from '../../../utils/chekAuth';
import { createPrescrition } from '../../../services/doctor/slots';

interface newPrescriptionType extends Medicine{
    errorMsg?:string
}
type PrescrptnCrtModalProps = {
    singlePatient: UserType | undefined
    setPrescrptnModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setPrescrptions: React.Dispatch<React.SetStateAction<Prescription[] | undefined>>
    prescriptions: any 
    getOnePateintPrescritionsHandler: () => Promise<void>
}

const PrescrptnCrtModal: React.FC<PrescrptnCrtModalProps> = ({singlePatient,setPrescrptnModalOpen,setPrescrptions,prescriptions,getOnePateintPrescritionsHandler}) => {


    const [medicines, setMedicines] = useState<newPrescriptionType[]>([
        { medicineName: '', purpose: '', dosage: '', frequency: '' },
    ])
    const [isLoading, setIsLoading] = useState(false);
     
    const [errorMessage, setErrorMessage] = useState('');

    const handleMedicineFormValidate=(err:string|undefined,index:number)=>{
        const errorMsgMedcine=medicines.map((e,indx)=>{
            if(index===indx){
                return {...e,errorMsg:err}
            }else{
                return e
            }
        })
        return errorMsgMedcine
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let errorFlag=false
        for(let i=0;i<medicines.length;i++){
            const e=medicines[i]
            if( /^\s*$/.test(e.medicineName)){
            // console.log('sdljnsldf',e.medicineName,i)

                console.log('e.medicineName',i)
                errorFlag=true
                const errorMsgMedcine=handleMedicineFormValidate('medicine name is required',i)
                setMedicines(errorMsgMedcine)
                break
            }else if(/^\s*$/.test(e.purpose)){
                console.log('e.purpos',e,i)
                errorFlag=true
                const errorMsgMedcine=handleMedicineFormValidate('purpose is required',i)
                setMedicines(errorMsgMedcine)
                break
            }else if(/^\s*$/.test(e.dosage)){
                console.log('e.dosage',i)
                errorFlag=true
                const errorMsgMedcine=handleMedicineFormValidate('dosage is required',i)
                setMedicines(errorMsgMedcine)
                break
            }else if(/^\s*$/.test(e.frequency)){
                console.log('e.frequency',i)
                errorFlag=true
                const errorMsgMedcine=handleMedicineFormValidate('frequency is required',i)
                setMedicines(errorMsgMedcine)
                break
            }else{
                console.log('no error',i)
                const errorMsgMedcine=handleMedicineFormValidate(undefined,i)
                setMedicines(errorMsgMedcine)
                 
            }
        }
        if(!errorFlag){
            try {
                if(singlePatient?._id){
                setIsLoading(true)
                const newPrescrition = await createPrescrition ( medicines,singlePatient?._id );
                setIsLoading(false)
                getOnePateintPrescritionsHandler()
                setPrescrptnModalOpen(false)
                console.log('Prescription created:', newPrescrition);
                // Reset form fields
                }
            } catch (error) {
                console.error('Error creating prescription:', error);
      checkDocterAuth(error)
                
                setErrorMessage('Error creating prescription. Please try again.');
            }
        }else{
            return
        }
   
       
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        // console.log(e.target.name, i);
        const values: any = [...medicines]
        values[i][e.target.name] = e.target.value
        setMedicines(values)

    }
    const handleAddFeilds = () => {
        const items = [...medicines, { medicineName: '', purpose: '', dosage: '', frequency: '' }]
        setMedicines(items)
    }
    const handleRemoveFeilds = (i: number) => {
        const items = [...medicines]
        if (medicines.length >= 2) {
            items.splice(i, 1)
            setMedicines(items)
        }
    }


    return (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50'>
            <div className='bg-white p-6 rounded shadow-md w-[90%] h-[70%] overflow-y-scroll relative'>
            <button 
                onClick={()=>setPrescrptnModalOpen(false)}
                className='bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600  '>
                    Back
                </button>
                <h2 className='text-xl text-center font-semibold mb-4 txt-them'>Create Prescription</h2>

                <div >
                    {errorMessage && <p className='my-[10px] ' style={{ color: 'red' }}>{errorMessage}</p>}
                    <form onSubmit={handleSubmit}

                    >
                        <div className='flex flex-col gap-5 '>

                            {
                                medicines?.map((medicine: any, i) => (
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex justify-around gap-2 items-center  '>


                                            <div>
                                                <label className='text-gray-700 '>Medicine Name</label>
                                                <div className='border border-sky-600 rounded-lg p-2'>
                                                    <input
                                                        type="text"
                                                        value={medicine.medicineName}
                                                        name='medicineName'
                                                        onChange={(e) => handleChange(e, i)}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className='text-gray-700 '>Purpose</label>
                                                <div className='border border-sky-600 rounded-lg p-2'>

                                                    <input
                                                        name='purpose'
                                                        type="text"
                                                        value={medicine.purpose}
                                                        onChange={(e) => handleChange(e, i)}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className='text-gray-700 '>Dosage</label>
                                                <div className='border border-sky-600 rounded-lg p-2'>

                                                    <input type="text"
                                                        name='dosage'
                                                        value={medicine.dosage}
                                                        onChange={(e) => handleChange(e, i)}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className='text-gray-700 '>Frequency</label>
                                                <div className='border border-sky-600 rounded-lg p-2 flex items-center  '>

                                                    <input
                                                        name='frequency'
                                                        type="text"
                                                        value={medicine.frequency}
                                                        onChange={(e) => handleChange(e, i)}
                                                    />

                                                </div>
                                            </div>

                                            <div className=' flex gap-1 items-center justify-center pt-3 '>
                                               {i!==0 &&(
                                                 <Button
                                                 onClick={() => handleRemoveFeilds(i)}
                                                 size='small' variant="contained" color="error" type='button' >
                                                 Remove
                                             </Button>
                                               )}


                                            </div>
                                        </div>
                                        <div>
                                            <p className='text-sm text-red-600 text-start '>{medicine.errorMsg && medicine.errorMsg}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex items-center justify-start gap-3'>

                            <Button
                                onClick={handleAddFeilds}
                                size='small' variant="contained" color="success" type='button' >
                                Add new medicine
                            </Button>
                            <Button sx={{ margin: '20px 0' }} size='medium' color="primary" variant="contained" type='submit' >
                                <span id="button-text">
                                    {isLoading ? <div className="spinner" id="spinner"></div> : "Submit Prescription"}
                                </span>
                            </Button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default PrescrptnCrtModal
