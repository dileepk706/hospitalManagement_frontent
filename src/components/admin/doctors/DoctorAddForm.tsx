
import React, { useEffect, useState } from 'react'
import { profileSchema, profileSchemaDoc } from '../../../schema/patient';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { UserType } from '../../../types/Models';
import { checkAdminAuth, checkUserAuth } from '../../../utils/chekAuth';
import { updateUser } from '../../../services/patients/patientLogin';
import { createDoctor } from '../../../services/admin/adminApi';
import { api } from '../../../api/axios';

type ProfileUpdateModalProps = {

}

export interface initialValuesType {
    name?: string;
    email?: string;
    phone?: string;
    age?: string;
    sex?: string
    department: string;
    education:string
    biography : string
    fee : number
    experience:number
}
type Department={
    departmentName:string
    _id:string
}

const DoctorAddForm = () => {

    const initialValues: initialValuesType = {
        name: '',
        email: '',
        phone: '',
        age: '',
        sex: '',
        department: '',
        education:'',
        biography:'',
        experience:0,
        fee:0
    }

    const [loading, setLoading] = useState<boolean>(false)
    const [apiError, setApiError] = useState<string>('')
    const [apiSuccess, setApiSuccess] = useState<string>('')
    const [deaprtment, setdepartment] = useState<Department[]|undefined>(undefined)


    useEffect(()=>{
        getAlldepartment()
    },[])

    const getAlldepartment=async ()=>{
        const res=await api.get('admin/all-department')
        const data=await res.data
        console.log(data)
        setdepartment(data?.departments)
    }

    const handleSubmit = async (doctor: initialValuesType) => {
        try {
            console.log({user: doctor})
            setApiError('')
            setApiSuccess('')
            const createdDoctor = await createDoctor(doctor)
            console.log(createdDoctor)
            setApiSuccess(createdDoctor?.message)
            setLoading(false)
        } catch (error: any) {
            console.error(error);
            error?.response?.data?.message && setApiError(error?.response?.data?.message)
            setLoading(false)
            checkAdminAuth(error)
        }
    }
    return (
        <div className=' w-full h-full '>
            <div className='bg-white p-6 '>
                <h2 className='text-xl font-semibold mb-4'>Create doctor</h2>
                {apiSuccess && (<h2 className='text-sm text-green-700 font-medium mb-3 mt-2'>{apiSuccess}</h2>)}
                {apiError && apiError && <p className='text-red-600 text-sm '>{apiError}</p>}

                <Formik
                    initialValues={initialValues}
                    validationSchema={profileSchemaDoc}
                    onSubmit={(values, { setSubmitting }) => {
                        // Handle form submission
                        setLoading(true)
                        handleSubmit(values)
                    }}
                >
                    <Form className='bg-white flex flex-col gap-2 items-center '>

                        <div className='w-full flex items-center justify-between p-5'>
                            {/* Name */}
                            <div className='w-[50%] p-8 '>
                                <div className='mb-4'>
                                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                        Name
                                    </label>
                                    <Field
                                        type='text'
                                        id='name'
                                        name='name'
                                        className='mt-1 p-5 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md'
                                    />
                                    <ErrorMessage name='name' component='div' className='text-red-600 text-sm' />
                                </div>

                                {/* Email */}
                                <div className='mb-4'>
                                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                        Email
                                    </label>
                                    <Field
                                        type='email'
                                        id='email'
                                        name='email'
                                        className='mt-1 p-5 focus:ring-blue-400  focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md'
                                    />
                                    <ErrorMessage name='email' component='div' className='text-red-600 text-sm' />

                                </div>

                                {/* Phone */}
                                <div className='mb-4'>
                                    <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                                        Phone Number
                                    </label>
                                    <Field
                                        type='number'
                                        id='phone'
                                        name='phone'
                                        className='mt-1 p-5 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md'
                                    />
                                    <ErrorMessage name='phone' component='div' className='text-red-600 text-sm' />
                                </div>

                                {/* Age */}
                                <div className='mb-4'>
                                    <label htmlFor='age' className='block text-sm font-medium text-gray-700'>
                                        Age
                                    </label>
                                    <Field
                                        type='number'
                                        id='age'
                                        name='age'
                                        className='mt-1 p-5 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md'
                                    />
                                    <ErrorMessage name='age' component='div' className='text-red-600 text-sm' />
                                </div>

                                {/* Gender */}
                                <div className='mb-4'>
                                    <span className='block text-sm font-medium text-gray-700'>Gender</span>
                                    <div className='mt-1 space-x-4'>
                                        <label className='inline-flex items-center'>
                                            <Field
                                                type='radio'
                                                name='sex'
                                                value='male'
                                                className='form-radio text-blue-500 focus:ring-blue-400'
                                            />
                                            <span className='ml-2'>Male</span>
                                        </label>
                                        <label className='inline-flex items-center'>
                                            <Field
                                                type='radio'
                                                name='sex'
                                                value='female'
                                                className='form-radio text-blue-500 focus:ring-blue-400'
                                            />
                                            <span className='ml-2'>Female</span>
                                        </label>
                                    </div>
                                    <ErrorMessage name='sex' component='div' className='text-red-600 text-sm' />
                                </div>
                            </div>

                            <div className='w-[50%] p-8'>
                                <h2 className='text-xl font-semibold my-4'>Medical Information</h2>

                                {/* Dropdown select for department */}
                                <div className='mb-4'>
                                    <label htmlFor='department' className='block text-sm font-medium text-gray-700'>
                                        Department
                                    </label>
                                    <Field
                                        as='select'
                                        id='department'
                                        name='department'
                                        className='mt-1 p-5 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md'
                                    >
                                        <option value='' disabled>
                                            Select a department
                                        </option>
                                        {deaprtment&&deaprtment?.map((e,i)=>(

                                        <option value={e._id}>{e.departmentName}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name='department' component='div' className='text-red-600 text-sm' />
                                </div>



                                {/* education */}
                                <div className='mb-4'>
                                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                    Medical Education
                                    </label>
                                    <Field
                                        type='text'
                                        id='education'
                                        name='education'
                                        className='mt-1 p-5 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md'
                                    />
                                    <ErrorMessage name='education' component='div' className='text-red-600 text-sm' />
                                </div>
                                

                                {/* biography */}
                                <div className='mb-4'>
                                    <label htmlFor='biography' className='block text-sm font-medium text-gray-700'>
                                        Doctor biography
                                    </label>
                                    <Field
                                        as='textarea' // Use 'textarea' instead of 'text'
                                        id='biography'
                                        name='biography'
                                        rows='4' // Specify the number of rows you want for the textarea
                                        className='mt-1 p-2 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md'
                                    />
                                    <ErrorMessage name='biography' component='div' className='text-red-600 text-sm' />
                                </div>

                                {/* experience */}
                                <div className='mb-4'>
                                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                    Experience
                                    </label>
                                    <Field
                                        type='text'
                                        id='experience'
                                        name='experience'
                                        className='mt-1 p-5 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md'
                                    />
                                    <ErrorMessage name='experience' component='div' className='text-red-600 text-sm' />
                                </div>


                                {/* fee */}
                                <div className='mb-4'>
                                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                        Conulting Fee
                                    </label>
                                    <Field
                                        type='text'
                                        id='fee'
                                        name='fee'
                                        className='mt-1 p-5 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md'
                                    />
                                    <ErrorMessage name='fee' component='div' className='text-red-600 text-sm' />
                                </div>

                            </div>
                        </div>





                        {/* Submit Button */}
                        <div className='flex justify-end mt-4'>
                            <button
                                type='submit'
                                className='them text-white py-2 px-4 rounded hover:bg-blue-600'
                            >
                                <span id="button-text">
                                    {loading ? <div className="spinner" id="spinner"></div> : "Create Doctor"}
                                </span>

                            </button>

                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default DoctorAddForm
