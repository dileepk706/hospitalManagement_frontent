import React, {useState } from 'react'
import demoImg from '../../../assets/images/smiling-nurse-portrait-isolated-white-using-digital-tablet_53419-9441 (1).jpg'
import { Avatar, Button, Rating } from '@mui/material'
import { DoctorType } from '../../../types/Models'

type DoctorDeatailsProps={
  doctor:DoctorType | undefined
  rating:number|undefined
  setIsRevwMdalOpn: React.Dispatch<React.SetStateAction<boolean>>
}

const  DoctorDeatails:React.FC<DoctorDeatailsProps>=({doctor,rating,setIsRevwMdalOpn})=> {
  const [showMoreDscrptin, setShowMoreDscrptin] = useState<string>('overflow-hidden')
 
  return (
    <div className=' w-full   md:w-2/3 py-[2%] flex flex-col overflow-y-auto'>

      {/* doctor details */}
      <div className='grid grid-cols-1 gap-4  md:grid-cols-3  mb-[5%] '>

        {/* image section */}
        <div className=' relative w-full flex  px-[20px] justify-center md:col-span-1'>
          <div className=' w-full '>
            <img src={demoImg} alt="" className='w-full ' />
          </div>
        </div>

        {/* doctor details */}
        <div className='flex flex-col items-center  gap-1 md:items-start  md:col-span-2'>

          <h1 className='text-xl font-semibold txt-them'>{doctor?.name}</h1>
          <p className='fontstyles text-sm text-gray-950 font-thin subpixel-antialiased mt-[3px]'>{doctor?.designation}</p>
          <p className='fontstyles text-sm text-gray-950 font-thin subpixel-antialiased mt-[3px]'>{doctor?.department?.departmentName}</p>
          <p className='fontstyles text-sm text-gray-950 font-thin subpixel-antialiased mt-[3px]'>{doctor?.yearOfExperiance} year of experiance </p>

          <div className='flex flex-col justify-end pl-[26px]'>
            <p className='fontstyles  text-sm text-green-700 font-thin subpixel-antialiased mt-[4px] '>Medical registration verrified </p>
            <Rating name="read-only" value={ rating} readOnly />
          </div>

          <div className={`w-full h-[30%] ${showMoreDscrptin} relative pr-[5%]`}>
            <p className='text-start fontstyles text-[10px] text-gray-950 font-thin subpixel-antialiased mt-[6px]'> {doctor?.biography}.</p>
            {showMoreDscrptin === 'overflow-hidden' &&
              <div className='block md:hidden'>
                <Button
                  sx={{ padding: '0 auto', position: 'absolute', bottom: '0', left: '40%', }}
                  variant='contained'
                  color='primary'
                  size='small'
                  onClick={() => {
                    setShowMoreDscrptin((prev: string) => {
                      return prev === 'overflow-hidden' ? '' : "overflow-hidden"
                    })
                  }}
                >
                  Read More
                </Button>
              </div>
            }
          </div>

        </div>

      </div>


      {/* reviews and health feed section */}
      <div className='flex flex-col'>

        <div className='flex justify-start gap-[4%] ml-[10px]'>
          <div className='flex flex-col items-center justify-center cursor-pointer'>
            <p className='fontstyles text-sm txt-them font-semibold subpixel-antialiased cursor-pointer '>Review </p>
            <hr style={{ borderTop: ' 2px solid green' }} className='w-full ' />
          </div>
          <div className='flex flex-col items-center justify-center cursor-pointer'>
            <p className='fontstyles text-sm txt-them font-semibold subpixel-antialiased cursor-pointer '>Healthfeeds </p>
          </div>
        </div>

        <div className='mt-[20px] mb-[10px] '>
          <p className=' text-lg fontstyles'>Patients reviews for Dr. Rani</p>

          <p 
          onClick={()=>setIsRevwMdalOpn(true)}
          className="text-blue-500 my-2 hover:underline cursor-pointer">
            Add a review
          </p>

        </div>

        <hr className='w-full' />

        <div className='flex flex-col my-4 gap-2'>

            {
            doctor?.reviews?.map((review, i) => (
              <div className='flex p-[10px]'>
                <div className='w-1/12'>
                  <Avatar />
                </div>
                <div className='flex flex-col w-11/12 pr-[20%]'>
                  <h3 className='text-lg text-gray-700 '> {review.patient.name} </h3>
                  <p className='text-sm fontstyles text-gray-950 mt-[15px] '>
                      {review.comment}
                  </p>
                </div>
              </div>

              ))
            }
        
        </div>

      </div>

    </div>
  )
}

export default DoctorDeatails
