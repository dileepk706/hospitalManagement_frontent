import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { api } from "../../../api/axios";
import CheckoutForm from "./CheckoutForm";



import { DoctorType, slots } from '../../../types/Models'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';

type BookingModalProps = {
    modalVisibleHelper: () => void
    selectedSlot: slots | undefined
    hide: any
    doctor: DoctorType | undefined
}
const StripContainer: React.FC<BookingModalProps> = ({ modalVisibleHelper, selectedSlot, hide, doctor }) => {
    const isUserAuthnticated = useAppSelector(state => state.user.accessToken)
    const navigate = useNavigate()

    const PUBLIC_KEY = 'pk_test_51NeJ0oSFeizR4TuZvCjZgqb7WrUu5eSmHmy57EEaOqGmozXmBNe4iqEq6Lg6U3WsSFYJmspgs1whRGDWC0FPqQqS00SmotE6Cg'
    const stripePromise = loadStripe(PUBLIC_KEY)




    const [clientSecret, setClientSecret] = useState("");

    
    
    return (
        <div className='flex justify-center items-center w-screen h-screen fixed'>
            <div className='relative w-full h-screen'>
                <div

                    className="w-[70%] h-[80vh] absolute rounded-lg shadow-lg shadow-black bg-gradient-to-b from-sky-200 to-sky-300 z-10 top-[5%] left-[11%]"
                >
                    <div className='w-full h-full grid grid-cols-2 relative'>

                        <button
                            className='absolute top-0 right-0 p-2 m-2 bg-gray-300 text-gray-700 rounded'
                            onClick={modalVisibleHelper}
                        >
                            Close
                        </button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default StripContainer
