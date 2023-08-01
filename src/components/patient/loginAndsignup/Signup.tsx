import React from 'react'
import { useFormik } from 'formik'
import { findRenderedDOMComponentWithTag } from 'react-dom/test-utils';
import { signupSchema } from '../../../schema/patient';

type SignupProps={
    setIsLogin:Function
}
interface initialValuesType{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}
const initialValues:initialValuesType={
    name:'',
    email:'',
    password:'',
    confirmPassword:''
}


const Signup:React.FC<SignupProps>=({setIsLogin})=>{

    const {values,errors,handleChange,handleBlur,handleSubmit}=useFormik({
        initialValues:initialValues,
        validationSchema:signupSchema,
        onSubmit:(values)=>{
            console.log('the onsubt sfjhs dsfgjh',values);
        }
        
    })
    

    return(
        <>
        <form onSubmit={handleSubmit} >

            <div>
                <label htmlFor="name">name</label>
                <input 
                type="text" 
                autoComplete='off'
                name='name'
                id='name'
                placeholder='name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                />
            </div>

            <div>
                <label htmlFor="email">email</label>
                <input 
                type="name" 
                autoComplete='off'
                name='email'
                id='email'
                placeholder='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                />
            </div>

            <div>
                <label htmlFor="password">password</label>
                <input 
                type="password" 
                autoComplete='off'
                name="password"
                placeholder='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                />
            </div>

            <div>
                <label htmlFor="confirm-password">confirm password</label>
                <input 
                type="password" 
                autoComplete='off'
                name="confirmPassword"
                placeholder='confirm password'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                />
            </div>
            <button type='submit'>submit</button>
        </form>
        </>
    )
}

export default Signup