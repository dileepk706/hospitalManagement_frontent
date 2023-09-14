import React,{useState} from 'react'
import { useFormik } from 'formik'
import { signupSchema } from '../../../schema/patient';
import doctersImg from '../../../assets/images/team-medical-professionals-white-background-team-medical-professionals-white-background-178237078.webp'
import LoginWithSocialMediaWrapper from './LoginWthSocialMdia';
import SignupAndLoginButton from './SignupButton';
import { userSignup } from '../../../services/patients/patientLogin';
import { useAppDispatch } from '../../../redux/hooks';
import { updateUserCredentials } from '../../../redux/patient/patientSlice';
import { useNavigate } from 'react-router-dom';

type SignupProps = {
  setIsLoginComponent: Function
}
interface initialValuesType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const initialValues: initialValuesType = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}


const Signup: React.FC<SignupProps> = ({ setIsLoginComponent }) => {

  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const [apiError,setApiError]=useState<string>('')
  const [loading,setLoading]=useState<boolean>(false)

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: (values, action) => {
      setLoading(true)
      setApiError('')
      const loginUser=async()=>{
        try {
          const User=await userSignup(values.email,values.name,values.password)
          if(User){
              const {accessToken,user}=User
              localStorage.setItem('usertoken',accessToken)
              dispatch(updateUserCredentials({accessToken:accessToken,userImage:user?.image?user.image:'',userName:user?.name}))
              const bookingUrl=localStorage.getItem('bookingUrl')
              if(bookingUrl){
                navigate(`${bookingUrl}`)
              }else{
                navigate('/')
              }
          }
          action.resetForm()
          setLoading(false)
        } catch (error: any) {
          error?.response?.data?.message && setApiError(error?.response?.data?.message)
          setLoading(false)
        }
      } 
      loginUser()

    }
  })
 

  return (
    <section className="h-screen">
      <div className="h-full">
        {/* Left column container with background */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12  grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 md:overflow-hidden">
            <img src={doctersImg} className="w-full max-w-[170%] md:w-[163%]" alt="" />
          </div>
          
          {/* Right column container */}
          <div className="mb-12 md:mb-0 md:w-8/12 md:px-[70px] lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSubmit}>

              {/* loagin with socialmedia */}
              {/* <LoginWithSocialMediaWrapper/> */}

              {/* Separator between social media sign in and email/password sign in */}
              <div className="relative mb-3" data-te-input-wrapper-init>
                <label className="block mb-1 text-[14px]   font-medium text-gray-800 dark:text-white">Pateint name</label>
                <input
                  type="text"
                  autoComplete='off'
                  name='name'
                  id='name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Pateint name' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  ' />
                {errors.name && touched.name && <p className='text-red-600 text-sm '>{errors.name}</p>}

              </div>

              <div className="relative mb-3" data-te-input-wrapper-init>
                <label className="block mb-1 text-[14px]   font-medium text-gray-800 dark:text-white">Email address</label>
                <input
                  type="name"
                  autoComplete='off'
                  name='email'
                  id='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Email address' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  ' />

                {errors.email && touched.email && <p className='text-red-600 text-sm '>{errors.email}</p>}

                {apiError && apiError && <p className='text-red-600 text-sm '>{apiError}</p>}

              </div>


              <div className="relative mb-3" data-te-input-wrapper-init>
                <label className="block mb-1 text-[14px]   font-medium text-gray-800 dark:text-white">Password</label>
                <input
                  type="password"
                  autoComplete='off'
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='password' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  ' />
                {errors.password && touched.password && <p className='text-red-600 text-sm '>{errors.password}</p>}
              </div>

              <div className="relative mb-3" data-te-input-wrapper-init>
                <label className="block mb-1 text-[14px]   font-medium text-gray-800 dark:text-white">Confrim password</label>
                <input
                  type="password"
                  autoComplete='off'
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='confirm password' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  ' />

                {errors.confirmPassword && touched.confirmPassword && <p className='text-red-600 text-sm '>{errors.confirmPassword}</p>}

              </div>

              {/* Login button */}
      
              <SignupAndLoginButton 
              setIsLoginComponent={setIsLoginComponent} 
              status={true} 
              setLoading={setLoading}  
              loading={loading}
              buttonName='Signup'/>
              
              
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup