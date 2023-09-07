import * as Yup from 'yup'

export const signupSchema=Yup.object({
    name:Yup.string().min(3).required('Please enter your name'),
    email:Yup.string().email().required('Please enter your email'),
    password:Yup.string().min(7).required('Please enter your password'),
    confirmPassword:Yup.string().required().oneOf([Yup.ref("password"),null as any],"password must match ")
})

export const loginSchema=Yup.object({
    email:Yup.string().email().required('Please enter your email'),
    password:Yup.string().required('Please enter your password'),
})

export const profileSchema=Yup.object({
    name:Yup.string().min(3).required('name should be more than 3 letters'),
    email:Yup.string().email().required('Please enter your email'),
    phone:Yup.string().min(10).max(10).required('Please enter your phone number'),
    age:Yup.number().positive().required('Please enter your age').max(99,'age must be 2 digits or less '),
    sex:Yup.string().required('Please select your gender'),
})

export const profileSchemaDoc=Yup.object({
    name:Yup.string().min(3).required('name should be more than 3 letters'),
    email:Yup.string().email().required('Please enter your email'),
    phone:Yup.string().min(10).max(10).required('Please enter your phone number'),
    age:Yup.number().positive().required('Please enter your phone number'),
    department: Yup.string().required('Department is required'),
    education: Yup.string().required('Education is required'),
    biography : Yup.string().required('Biography is required'),
    fee : Yup.number().positive().required('Please enter consulting fee'),
    experience:Yup.number().positive().required('Please enter experience'),
    
})
 
