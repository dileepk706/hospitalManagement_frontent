import { Send } from "@mui/icons-material"
import { Button, Chip, Rating } from "@mui/material"
import React from 'react'
import { Link } from "react-router-dom"
import { Review } from "../../../types/Models"

type DoctorCardProps={
    id:string
    DoctorName:string
    department:string
    image?:string
    experience:number
    cunsultingFee:number
    review:Review[]
    rating:number
}

const DoctorCard:React.FC<DoctorCardProps> = ({DoctorName,department,image,experience,cunsultingFee,review,rating,id}) => {
    const defualtImage="https://img.freepik.com/premium-vector/avatar-female-doctor-with-black-hair-doctor-with-stethoscope-vector-illustrationxa_276184-33.jpg?w=2000"

    const reviewCount=review?.length;
    return (
        <div v-for="card in cards" className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-[0_5px_15px_rgba(8,_112,_184,_0.7)]  mt-4 w-100 ">
            <div className="h-64 w-auto md:w-1/3 p-3">
                <img
                    src={image?image:defualtImage} alt=""
                    className="inset-0 h-full w-full object-cover object-center rounded-[17px] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]" />
            </div>

            {/* <!-- content --> */}
            <div className="w-full py-4 px-6 flex flex-col">
                <h3 className="font-bold text-lg leading-tight truncate txt-them">{DoctorName}</h3>
                <p className="mt-2 text-sm ">{department}</p>
                <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">{experience}  years experience</p>
                <p className=" text-gray-700 uppercase tracking-wide font-semibold mt-2">₹{cunsultingFee} Consultation fee </p>
                <div className="flex justify-start mt-1 mb-1 items-center gap-3">
                    <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                    <p className="mt-2 text-sm ">{reviewCount?reviewCount:0} Patient Reviews</p>
                </div>
                <div className="flex justify-start mt-5 items-center gap-3">
                   
                    <Button variant="contained" size="small" color="primary">
                        <Link to={`/make-appointment/${id}`}>Make an appointment</Link>
                    </Button>

                </div>
            </div>
        </div>

    )
}

export default DoctorCard