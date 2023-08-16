import React, { useState, useRef, useEffect ,Suspense,lazy} from 'react';
import { checkUserAuth } from '../../../utils/chekAuth';
import { getUerInfo } from '../../../services/patients/patientLogin';
import { UserType } from '../../../models/Models';
const ProfileUpdateModal=lazy(() => import('./ProfileUpdateModal')) 
// import { useFormik } from 'formik';
// import ProfileUpdateModal from './ProfileUpdateModal';

const defaultimage='https://ionicframework.com/docs/img/demos/avatar.svg'



  
const ProfileWrapper= () => {
    
    const [user,setUser]=useState<UserType|undefined>(undefined)
    const [isModalOpen, setIsModalOpen] = useState(false);

    

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }; 

     useEffect(()=>{
         const getUser=async()=>{
            try {
               const User=await getUerInfo()
               setUser(User)
            } catch (error) {
                console.error(error);
                checkUserAuth(error)
            }
         }
         getUser()
     },[])

     console.log('user : ',user);
     
      
     
    return (
        //article and news section 
        <div className='bg-white p-6 border border-gray-300 rounded shadow-md'>
        <div className='flex justify-between items-center mb-4'>
          <h4 className='text-xl font-semibold'>Accounts</h4>
          <button
            onClick={openModal}
            className='bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600'>
            Edit Profile
          </button>
        </div>
        <hr className='my-2 border-gray-300' />
      
        <div className='flex items-center mb-6'>
          <div className='w-16 h-16 flex-shrink-0 mr-4'>
            <img
              src={user?.image ? user.image : defaultimage}
              alt="Profile"
              className='w-full h-full rounded-full object-cover'
            />
          </div>
          <div className='flex-grow'>
            <label className='block text-gray-600 mb-1'>Name</label>
            <div className='bg-gray-100 p-2 rounded'>
              <h4 className='text-gray-800'>{user?.name}</h4>
            </div>
          </div>
        </div>
        <hr className='my-2 border-gray-300' />
      
        <div className='flex flex-col mb-6'>
          <div className='flex items-start mb-2'>
            <div className='w-1/2 pr-2'>
              <p className='text-gray-600'>Phone number</p>
              <div className='bg-gray-100 p-2 rounded'>
                <h5 className='text-gray-800'>{user?.phone}</h5>
              </div>
            </div>
            <div className='w-1/2 pl-2'>
              <p className='text-gray-600'>Email address</p>
              <div className='bg-gray-100 p-2 rounded'>
                <h5 className='text-gray-800'>{user?.email}</h5>
              </div>
            </div>
          </div>
          <div className='flex items-start'>
            <div className='w-1/2 pr-2'>
              <p className='text-gray-600'>Age</p>
              <div className='bg-gray-100 p-2 rounded'>
                <h5 className='text-gray-800'>{user?.dob}</h5>
              </div>
            </div>
            <div className='w-1/2 pl-2'>
              <p className='text-gray-600'>Gender</p>
              <div className='bg-gray-100 p-2 rounded'>
                <h5 className='text-gray-800'>{user?.sex}</h5>
              </div>
            </div>
          </div>
        </div>
        <hr className='my-2 border-gray-300' />
      
        <div className='flex flex-col'>
          <h4 className='text-xl font-semibold mb-2'>Address</h4>
          <div className='flex flex-col mb-2'>
            <div className=''>
              <p className='text-gray-600'>House No./Area</p>
              <div className='bg-gray-100 p-2 rounded'>
                <h5 className='text-gray-800'>{user?.address.houseNo}</h5>
              </div>
            </div>
          </div>
          <div className='flex flex-col mb-2'>
            <div className=''>
              <p className='text-gray-600'>City</p>
              <div className='bg-gray-100 p-2 rounded'>
                <h5 className='text-gray-800'>{user?.address.city}</h5>
              </div>
            </div>
          </div>
          <div className='flex flex-col mb-2'>
            <div className=''>
              <p className='text-gray-600'>State</p>
              <div className='bg-gray-100 p-2 rounded'>
                <h5 className='text-gray-800'>{user?.address.state}</h5>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className=''>
              <p className='text-gray-600'>Country</p>
              <div className='bg-gray-100 p-2 rounded'>
                <h5 className='text-gray-800'>{user?.address.country}</h5>
              </div>
            </div>
          </div>
        </div>
      
        {isModalOpen && (
          <Suspense fallback={(
            <div className='bg-gray-100 p-2 rounded'>
                <h5 className='text-gray-800'>sdilufysdiufgdsiufisdyfis isa fisafsagfilsagfilsyaegf liayfg sidlahg</h5>
              </div>
          )}>

            <ProfileUpdateModal user={user} closeModal={closeModal} setUser={setUser} />
          </Suspense>
        )}
      </div>
      


    );

}
export default ProfileWrapper

