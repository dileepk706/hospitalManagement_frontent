import React from 'react'
import { Link } from 'react-router-dom';

type LoginButtonProps = {
}

const DoctorLoginRouterLink: React.FC<LoginButtonProps> = () => {

    return (
        <p className="mb-0 mt-2 pt-1 text-sm ">
            Are you Doctor?
            <button
                className="text-green-800 transition duration-150 ease-in-out  cursor-pointer"
            >
                <Link to={'/doctor/login'}>
                    login as Docotor
                </Link>
            </button>
        </p>
    )
}

export default DoctorLoginRouterLink