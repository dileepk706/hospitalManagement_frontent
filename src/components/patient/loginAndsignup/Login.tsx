import React, { useState } from 'react';
import { loginSchema } from '../../../schema/patient';
import { useFormik } from 'formik';
import doctersImg from '../../../assets/images/team-medical-professionals-white-background-team-medical-professionals-white-background-178237078.webp'
import LoginWithSocialMediaWrapper from './LoginWthSocialMdia';
import SignupAndLoginButton from './SignupButton';
import { userLogin } from '../../../services/patients/patientLogin';
import { useAppDispatch } from '../../../redux/hooks';
import { updateUserCredentials } from '../../../redux/patient/patientSlice';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setIsLoginComponent: Function;
}

interface initialValuesType {
  email: string;
  password: string;
}

const initialValues: initialValuesType = {
  email: 'dlpkmr706@gmail.com',
  password: '1234567'
}


const Login: React.FC<LoginProps> = ({ setIsLoginComponent }) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  
  const [loading, setLoading] = useState<boolean>(false)
  const [apiError, setApiError] = useState<string>('')

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setLoading(true)
      const userLoginHelper = async () => {
        try {
          const User = await userLogin(values.email, values.password)
          if (User) {
            const { accessToken, user } = User
            localStorage.setItem('usertoken', accessToken)
            dispatch(updateUserCredentials({
              accessToken: accessToken,
              userImage: user?.image ? user.image : '',
              userName: user?.name,
              userEmail: user?.email,
              userPhone: user?.phone ? user?.phone : ''
            }))
            const bookingUrl = localStorage.getItem('bookingUrl')
            console.log('bookingUrl', bookingUrl);

            if (bookingUrl) {
              navigate(`${bookingUrl}`)

            } else {
              navigate('/')
            }
          }
        } catch (error: any) {
          error?.response?.data?.message && setApiError(error?.response?.data?.message)
          console.log(error?.response);
          setLoading(false)
        }
      }
      userLoginHelper()
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
              {/* login with socialmedia */}
              {/* <LoginWithSocialMediaWrapper /> */}

              <div className="relative mb-6" data-te-input-wrapper-init>
                <label className="block   text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                <input
                  type="name"
                  autoComplete='on'
                  name='email'
                  id='email'
                  value={values.email}
                  onClick={() => setApiError('')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Email address' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  ' />
                {errors.email && touched.email && <p className='text-red-600 text-sm '>{errors.email}</p>}
                {apiError === 'User is not exist' && <p className='text-red-600 text-sm '>{apiError}</p>}
                {apiError === 'User is blocked by admin' && <p className='text-red-600 text-sm '>{apiError}</p>}


              </div>


              <div className="relative mb-6" data-te-input-wrapper-init>
                <label className="block   text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  autoComplete='off'
                  name="password"
                  value={values.password}
                  onClick={() => setApiError('')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='password' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  ' />
                {errors.password && touched.password && <p className='text-red-600 text-sm '>{errors.password}</p>}
                {apiError === 'Incorrect password' && <p className='text-red-600 text-sm '>{apiError}</p>}
              </div>



              <div className="mb-6 flex items-center justify-between">
                {/* Forgot password link */}
                <a href="#!">Forgot password?</a>
              </div>

              {/* Login button */}
              <SignupAndLoginButton
                setIsLoginComponent={setIsLoginComponent}
                status={false}
                buttonName='Login'
                setLoading={setLoading}
                loading={loading}
              />

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
