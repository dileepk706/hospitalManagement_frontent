import LoadingSvgForButtons from '../../LodingSpinnerSvg';
import React from 'react'

type LoginButtonProps={
    setIsLoginComponent:Function;
    status:boolean;
    buttonName:string;
}

const SignupAndLoginButton:React.FC<LoginButtonProps>=({setIsLoginComponent ,status,buttonName})=>{

    return(
        <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block them rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                    {buttonName}
                  <LoadingSvgForButtons />

                </button>

                {/* Register link */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Do you have an account?
                  <button
                    onClick={() => setIsLoginComponent(status)}
                    className="text-danger transition duration-150 ease-in-out  cursor-pointer"
                  >
                    {buttonName==='Login'?'Signup':'Login'}
                  </button>
                </p>
              </div>
    )
}

export default SignupAndLoginButton