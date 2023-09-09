import { Rating } from '@mui/material';
import React, { useState } from 'react'
import { addReviewRating } from '../../../services/patients/patientLogin';
import { useNavigate } from 'react-router-dom';
import { DoctorType } from '../../../types/Models';

type RaviewRatingFormProp = {
    doctor: string
    isConsulted?: boolean
}
const RaviewRatingForm: React.FC<RaviewRatingFormProp> = ({ doctor, isConsulted }) => {

    const navigate = useNavigate()

    const [rating, setRating] = useState<number | null>(1);
    const [review, setReview] = useState<string>('');
    const [validationError, setValidationError] = useState('')
    const [apiError, setApiError] = useState('')
    const [reviewAdded, setReviewAdded] = useState<DoctorType | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValidationError('')
        setReview(event.target.value);
    };
    const handleRatingDoctor = (event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
        setRating(newValue);
        console.log(newValue);

    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            if (rating && review) {
                if (/^\s*$/.test(review)) {
                    setValidationError('Type somthing')
                    setIsLoading(false)
                    return
                }
                const data = await addReviewRating(rating, review, doctor)
                setReviewAdded(data)
                setIsLoading(false)
                setReview('')
            } else {
                setValidationError('Type somthing')
            }
        } catch (error: any) {
            console.error('Error:', error);
            error?.response?.data?.message && setApiError(error?.response?.data?.message)

        }
    };



    return (
        <div className='them rounded-lg flex flex-col items-center justify-center gap-2 shadow-sm shadow-black p-2 ' >
            <div className="py-8 px-4 bg-gray-100 rounded-lg shadow-lg">
                <p className='text-red-600 text-center my-3' >{apiError && apiError}</p>
                <p className='text-green-600 text-center my-3' >{reviewAdded && 'Review and Rating is submited'}</p>


                <h2 className="text-2xl font-semibold mb-4">Add Review and Rating to Doctor</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex items-center my-[10%] ">
                        <label className="w-32 text-gray-600">Rating:</label>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={handleRatingDoctor}
                        />
                    </div>


                    <div className="flex items-center">
                        <label className="w-32 text-gray-600">Review:</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Write your review here..."
                            value={review}
                            onChange={handleReviewChange}
                        ></textarea>
                    </div>
                    <p className='text-red-600 text-start my-3' >{validationError && validationError}</p>
                    <div className='flex items-center justify-center gap-10'>

                        {
                            !isConsulted && (
                                <button
                                    onClick={() => {
                                        navigate('/')
                                    }}
                                    type="submit"
                                    className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg"
                                >
                                    Go to Home
                                </button>
                            )
                        }

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                        >
                            <span id="button-text">
                                {isLoading ? <div className="spinner" id="spinner"></div> : "Submit Review"}
                            </span>
                        </button>
                    </div>
                </form>
            </div>



        </div>
    )
}

export default RaviewRatingForm
