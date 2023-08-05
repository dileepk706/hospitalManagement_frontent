import { Divider } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
 
type AddScheduleProps={}

const AddSchedule:React.FC<AddScheduleProps>=()=> {
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
    
     console.log(newValue?.format('YYYY-MM-DD'));
     
  };
    return (
        <div className='flex flex-col justify-center items-center shadow-sm shadow-slate-400  w-2/3'>

            <div className='flex justify-between items-center py-[10px]' >
                <h4 className='text-lg font-medium font-mono'>
                    ADD SCHEDULE
                </h4>
                <Link to={'/doctor/shcedules'}>
                    <p className='txt-them '>
                        Schedule List
                    </p>
                </Link>
            </div>

            <hr className='w-full ' />

            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker value={selectedDate} onChange={handleDateChange} />
                    </DemoContainer>
                </LocalizationProvider>
            </div>

        </div> 
    );
  }
  
 export default AddSchedule