 

import * as Yup from 'yup'

export const signupSchema=Yup.object({
    name:Yup.string().min(3).required('Please enter your name'),
    email:Yup.string().email().required('Please enter your email'),
    password:Yup.string().min(6).required('Please enter your password'),
    confirmPassword:Yup.string().required().oneOf([Yup.ref("password"),null as any],"password must match ")
})

export const loginSchema=Yup.object({
    email:Yup.string().email().required('Please enter your email'),
    password:Yup.string().min(6).required('Please enter your password'),
})