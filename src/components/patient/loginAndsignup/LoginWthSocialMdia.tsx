import { motion } from 'framer-motion'
import LoginWithGoogle from '../loginSocialMedia/LoginWithGoogle';

const LoginWithSocialMediaWrapper = () => {

    return (
        <>
            <div className="flex flex-row items-center justify-center mb-6 lg:justify-start">
                <p className="mb-0 mr-4 text-lg    ">Sign in with</p>
                <motion.div
                    initial={{ x: 500 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.2, duration: 1 }}
                >
                    <LoginWithGoogle />
                </motion.div>

                

            </div>
            <div
                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p
                    className="mx-4 mb-0 text-center font-semibold dark:text-white">
                    Or
                </p>
            </div>
        </>
    )
}

export default LoginWithSocialMediaWrapper