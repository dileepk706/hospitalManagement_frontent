import { CalendarMonth } from '@mui/icons-material';
import React, { useState } from 'react';
import SideBarList from './SideBarList';
import Nav from '../nav/Nav';
import { Link } from 'react-router-dom';


const Drawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleDropdownClick = (itemName:any) => {
    setSelectedItem((prev)=>{
      return prev===itemName?'':itemName
    });
  };

  return (
    < >
      {/* Drawer init and show button */}

      <Nav toggleDrawer={toggleDrawer}/>

      {/* Drawer component */}
      {isDrawerOpen && (
        <div
          className="fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-30"
          onClick={toggleDrawer}
        />
      )}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? '' : '-translate-x-full'
        } bg-white w-64 dark:bg-gray-800`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          DOCTOR
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>


        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">

          <SideBarList titleName='Home' path='home'/>
          <SideBarList titleName='Profile' path='profile'/>
          <SideBarList titleName='Appointmets' path='appointments'/>
          <SideBarList titleName='Pateints' path='patients'/>

              

            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example-ecommerce"
                onClick={() => handleDropdownClick('Schedule')}
              >
                <CalendarMonth/>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Schedule
                </span>
                <svg
                  className={`w-3 h-3 ${
                    selectedItem === 'Schedule' ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown-example-ecommerce"
                className={`${
                  isDrawerOpen && selectedItem === 'Schedule'
                    ? 'block'
                    : 'hidden'
                } py-2 space-y-2`}
              >
                <li>
                  <p
                    className="flex cursor-pointer items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <Link to={'add-schedule'}>
                      Add schedule
                    </Link>
                  </p>
                </li>
                <li>
                  <p
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    List schedule
                  </p>
                </li>
                
              </ul>
            </li>
           
           
            <SideBarList titleName='Feedback' path='feedback'/>




            {/* Rest of the menu items */}
          </ul>
        </div>
      </div>
    </ >
  );
};

export default Drawer;
