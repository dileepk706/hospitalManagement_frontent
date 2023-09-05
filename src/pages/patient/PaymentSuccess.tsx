import React,{useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { changePaymentStatus } from '../../redux/patient/paymentSlicer'
import { bookSlote } from '../../services/patients/patientLogin'
import { checkUserAuth } from '../../utils/chekAuth'

function PaymentSuccess() {
    const dispatch=useAppDispatch()
    dispatch(changePaymentStatus(true))
    const { doctorId, slotId,fee } = useParams();
    const [isLoading,setisLoading]=useState(false)
    

    useEffect(() => {
        const sloteBookingHelper = async () => {
            try {
                setisLoading(true)
                const cousltingFee:number = parseInt(fee || '')
                const bookedSlote = await bookSlote(doctorId,slotId,cousltingFee)
                console.log('bookedSlote ', bookedSlote);
                
            } catch (error) {
                console.error(error);
                checkUserAuth(error)
            }
        }
        sloteBookingHelper()
    }, [])
  return (
      <div className="bg-gray-100 h-screen items-center justify-center">
          <div className="bg-white h-full mt-[10%] p-6 md:mx-auto">
              <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                  <path
                      fill="currentColor"
                      d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                  </path>
              </svg>
              <div className="text-center">
                  <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                  <p className="text-gray-600 my-2">Thank you for completing your secure online payment. You have successfully booked an appointment with our doctor.</p>
                  <p>Have a great day! If you have any questions or need further assistance, feel free to contact us.</p>

                <div className='flex justify-center'>
                      <div className="py-10 px-10 text-center w-2/4">
                          <p className="px-12 them hover:bg-indigo-500 text-white font-semibold py-3">
                              <Link to={'/appointments/all'}> GO BACK TO APPOINTMENTS</Link>
                          </p>
                      </div>
                </div>
              </div>
          </div>
      </div>

  )
}

export default PaymentSuccess
