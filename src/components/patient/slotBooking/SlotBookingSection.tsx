import React, { useState, useEffect } from "react";
import { Button } from '@mui/material'
import { DoctorType, slots } from "../../../models/Models";
import moment from 'moment'

type SlotBookingSectionProps = {
  slots: slots[] | undefined
  rating:number|undefined
  doctor:DoctorType|undefined
  modalVisibleHelper: () => void
  setSelectedSlot:React.Dispatch<React.SetStateAction<slots | undefined>>
}

const SlotBookingSection: React.FC<SlotBookingSectionProps> = ({ slots ,rating,doctor,modalVisibleHelper,setSelectedSlot}) => {

  const [filterdSlots, setFilterdSlots] = useState<slots[] | undefined>([])
  const [selectedDay, setSelectedDay] = useState<string>('today')

  const today = moment().format("YYYY-MM-DD");
  const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");
  const thirdDay = moment().add(2, "days").format("YYYY-MM-DD");

  const selectDate = (date: string, day: string) => {
    setSelectedDay(day)
    const fltrSlots = slots?.filter(slot => slot.slot_date === date)
    setFilterdSlots(fltrSlots)
  }

  useEffect(() => {
    const fltrSlots = slots?.filter(slot => slot.slot_date === today)
console.log('filterdSlots',fltrSlots);

    setFilterdSlots(fltrSlots)
  }, [slots])

  return (
    <div className='absolute top-0 right-[34%]'>

      <div className=' hidden pl-[40px]   w-1/3 h-screen md:block fixed '>

        <div className='flex flex-col w-full gap-3 mb-[30px]'>

          <div>
            <h4 className='text-xl text-start font-medium txt-them'>Pick time slot</h4>
          </div>

          <div className='flex justify-between items-center my-2 p-3 bg-sky-400 rounded-t-md'>
            <p className='fontstyles text-sm font-medium text-gray-950 subpixel-antialiased'>Online consultation</p>
            <p className='fontstyles text-sm font-medium text-gray-950 mr-[20%] subpixel-antialiased'>₹ {doctor?.consultingFee} fee</p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='fontstyles text-sm text-gray-950 subpixel-antialiased'>DR. {doctor?.name}</p>
            <div className='flex justify-between w-1/3'>
              <p className='fontstyles text-[10px] text-yellow-600 subpixel-antialiased'>{rating}</p>
              <p className='fontstyles text-[10px] text-blue-700 subpixel-antialiased'>₹ {doctor?.consultingFee} max 15 mins wait</p>
            </div>
          </div>
        </div>

        <hr className='w-full' />

        <div className='flex flex-col'>

          <div className='flex justify-between gap-2 py-[10px]'>
           
            <div
              className='flex flex-col justify-center items-center '
              onClick={() => { selectDate(today, 'today') }}
            >
              <h2 className='font-medium cursor-pointer '>Today</h2>
              <div className="w-full py-[2px]">
                {selectedDay === 'today' && <hr style={{ borderTop: ' 4px solid green' }} className='w-full ' />}

              </div>
            </div>

            <div
              className='flex flex-col justify-center items-center cursor-pointer'
              onClick={() => selectDate(tomorrow, 'tomorrow')}
            >
              <h2 className='font-medium '>Tomorrow</h2>
              <div className="w-full py-[2px]">
                {selectedDay === 'tomorrow' && <hr style={{ borderTop: ' 4px solid green' }} className='w-full ' />}
              </div>
            </div>

            <div
              className='flex flex-col justify-center items-center cursor-pointer'
              onClick={() => selectDate(thirdDay, 'thirdDay')}
            >
              <h2 className='font-medium '>{thirdDay}</h2>
              <div className="w-full py-[2px]">
                {selectedDay === 'thirdDay' && <hr style={{ borderTop: ' 4px solid green' }} className='w-full ' />}

              </div>
            </div>

          </div>

          <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 my-[10px]'>
            {
              filterdSlots?.map(slot => {
                
                return (
                  <Button 
                  onClick={()=>{
                    modalVisibleHelper()
                    setSelectedSlot(slot)
                  }}
                  variant='outlined' color='primary' size='small'
                  >
                    {slot?.slot_time}
                  </Button>
                )
              })
            }


          </div>
        </div>
      </div>
      
    
    </div>
  )
}

export default SlotBookingSection
