import React, { useState } from 'react'
import { profileSchema } from '../../../schema/patient';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { UserType } from '../../../types/Models';
import { checkUserAuth } from '../../../utils/chekAuth';
import { updateUser } from '../../../services/patients/patientLogin';

type ProfileUpdateModalProps = {
    user?: UserType;
    closeModal: () => void;
    setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
}

interface initialValuesType {
    name?: string;
    email?: string;
    phone?: string;
    age?: string;
    sex?: string
}

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({ user, closeModal, setUser }) => {

    const initialValues: initialValuesType = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        age: user?.dob,
        sex: user?.sex
    }
    const [loading, setLoading] = useState<boolean>(false)
    const [apiError, setApiError] = useState<string>('')
    const [apiSuccess, setApiSuccess] = useState<string>('')


    const handleSubmit = async (user: initialValuesType) => {
        try {
            setApiError('')
            setApiSuccess('')
            const updatedUser: UserType = await updateUser(user.name, user.email, user.age, user.phone, user.sex)
            setUser(updatedUser)
            setApiSuccess('Profile Updated')
            setLoading(false)
        } catch (error: any) {
            console.error(error);
            error?.response?.data?.message && setApiError(error?.response?.data?.message)
            setLoading(false)
            checkUserAuth(error)
        }
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50'>
            <div className='bg-white p-6 rounded shadow-md w-96'>
                <h2 className='text-xl font-semibold mb-4'>Update Profile</h2>
                {apiSuccess && (<h2 className='text-sm text-green-700 font-medium mb-3 mt-2'>{apiSuccess}</h2>)}
                <Formik
                    initialValues={initialValues}
                    validationSchema={profileSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        // Handle form submission
                        setLoading(true)
                        handleSubmit(values)
                    }}
                >
                    <Form className='bg-white w-full  '>

                        {/* Name */}
                        <div className='mb-4'>
                            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                Name
                            </label>
                            <Field
                                type='text'
                                id='name'
                                name='name'
                                className='mt-1 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
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
                                className='mt-1 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            />
                            <ErrorMessage name='email' component='div' className='text-red-600 text-sm' />
                            {apiError && apiError && <p className='text-red-600 text-sm '>{apiError}</p>}

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
                                className='mt-1 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
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
                                className='mt-1 focus:ring-blue-400 focus:border-blue-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
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

                        {/* Submit Button */}
                        <div className='flex justify-end mt-4'>
                            <button
                                type='submit'
                                className='them text-white py-2 px-4 rounded hover:bg-blue-600'
                            >
                                <span id="button-text">
                                    {loading ? <div className="spinner" id="spinner"></div> : "Save changes"}
                                </span>
                                
                            </button>
                            <button
                                type='button'
                                className='ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400'
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default ProfileUpdateModal
