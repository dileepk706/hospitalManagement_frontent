import * as React from 'react'
import { Menu } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useAppSelector } from '../../../redux/hooks';
type NavProps = {
    toggleDrawer:Function
}

const Nav: React.FC<NavProps> = ({toggleDrawer}) => {
    const doctor = useAppSelector(state => state.doctor)

    return (
        <div className='w-full z-10 p-2   sticky top-0 rounded-md flex justify-between shadow-sm shadow-slate-300'>
            
            <button
                className="text-black bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-3 py-1.5 mr-2 dark:bg-white dark:hover:bg-white focus:outline-none "
                type="button"
                onClick={()=>toggleDrawer()}
            >
                <Menu />
            </button>
            <div className='flex justify-between items-center gap-1'>
                <p>Dr.{doctor?.doctorName}</p>
                <Avatar onClick={() => { }} alt="Remy Sharp" src={`${doctor?.doctorImage}`} />
            </div>
        </div>
    )
}

export default Nav