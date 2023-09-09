import {Button} from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TimePicker } from '@mui/x-date-pickers';
import { CreateSlote } from '../../../services/doctor/slots';
import { checkDocterAuth } from '../../../utils/chekAuth';
type AddScheduleProps = {}

const AddSchedule: React.FC<AddScheduleProps> = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [startingTime, setStartingTime] = useState<string | null>(null);
    const [endingTime, setEndingTime] = useState<string | null>(null);
    const [timeDuration, setTimeDuration] = useState<number>(15);
    const [apiError,setApiError]=useState<string>('')
    const [apiMessage,setApiMessage]=useState<string>('')


    const handleTimeDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = parseInt(event.target.value, 10);
        setTimeDuration(selectedValue);
    };

    const handleDateChange = (date: any) => {
        setSelectedDate(date?.format('YYYY-MM-DD'));
    };
  
    const CreateSloteHelper=async()=>{
        try {
            setApiError('')
            setApiMessage('')
            const createdSlote = await CreateSlote(startingTime,endingTime,timeDuration,selectedDate)
            console.log(createdSlote);
            setApiMessage('Slotes created Succussfully')
        } catch (error:any) {
            checkDocterAuth(error)
            setApiError(error?.response?.data?.message)
            console.log('error : ',error?.response?.status );
        }
    }

    const handleStartingTimeChange = (time: any) => {
        setStartingTime(time.format('h:mm A'));
    };
    const handleEndingTimeChange = (time: any) => {
        setEndingTime(time.format('h:mm A'));
    };

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='flex flex-col items-center  py-[5%] shadow-sm shadow-slate-400  w-2/3 px-[20px]'>

                <div className='flex justify-between w-2/3 items-center py-[10px]' >
                    <h4 className='text-lg font-medium font-mono'>
                        ADD SCHEDULE
                    </h4>
                    {/* <Link to={'/doctor/shcedules'}>
                        <p className='txt-them '>
                            Schedule List
                        </p>
                    </Link> */}
                </div>

                <hr className='w-full ' />

                <div className='flex items-center w-full my-3'>
                    <p className='text-center text-red-700'>
                        {apiError&&apiError}
                    </p>
                    <p className='text-center my-3 text-green-700'>
                        {apiMessage&&apiMessage}
                    </p>
                </div>

                <div className='mt-[3%] flex flex-col '>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer 
                        components={['DatePicker', 'StaticTimePicker']}>
                            <DatePicker
                                label="Date picker"
                                value={selectedDate}
                                onChange={handleDateChange}
                                />
                        </DemoContainer>
                    </LocalizationProvider>

                    <div className='flex justify-between items-center gap-2' >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer 
                        components={['TimePicker']}>
                            <TimePicker
                                label="Starting time"
                                value={startingTime}
                                onChange={ 
                                    handleStartingTimeChange
                                }
                            />
                        </DemoContainer>

                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer 
                        components={['TimePicker']}>
                            <TimePicker
                                label="Ending Time"
                                value={endingTime}
                                onChange={handleEndingTimeChange}
                            />
                        </DemoContainer>

                    </LocalizationProvider>

                    </div>
                </div>
                <div className='my-[10px]'>

                    <label htmlFor="timeDuration" className="block text-gray-700 font-medium">Time Duration:</label>
                    <select
                        name="timeDuration"
                        id="timeDuration"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={timeDuration.toString()} // Convert number to string
                        onChange={handleTimeDurationChange}
                    >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="90">1 hour 30 minutes</option>
                    </select>
                </div>
                <div className='my-[20px]'>
                    <Button variant={'contained'} color='primary' onClick={CreateSloteHelper}>Create</Button>
                </div>
            </div>
        </div>

    );
}

export default AddSchedule;

