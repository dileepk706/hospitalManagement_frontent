import React,{useState,useEffect} from 'react'
import { DoctorType } from '../../../types/Models';
import { getDoctorInfo } from '../../../services/doctor/slots';
import { checkDocterAuth } from '../../../utils/chekAuth';
import ProfileUpdateModal from './ProfileUpdateModal';

function ProfileContainer() {
  
    
    const [doctor,setDoctor]=useState<DoctorType|undefined>(undefined)
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
              const Doctor=await getDoctorInfo()
              console.log('Doctor :',Doctor)
              setDoctor(Doctor)
           } catch (error:any) {
               console.error(error);
               checkDocterAuth(error)
           }
        }
        getUser()
    },[])

     console.log('user : ',doctor);
     
      
     
    return (
        <div className="w-full pb-[2%] p-4 bg-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-1/6">
                  <img src="https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=841&q=80" alt="Profile" className="w-full  rounded-full " />
                </div>
                <div className="w-5/6 ml-4">

                  <div className="flex justify-between items-center my-[10px] ">
                    <h3 className="text-xl font-semibold txt-them ">{doctor?.name}</h3>
                    <div className='flex gap-4 items-center'>
                    {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit profile</button> */}
                    {/* <button className='bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 '>Back</button> */}
                    </div>
                  </div>

                  <div className="flex justify-between mt-[8%] ">
                    <div className='flex flex-col gap-2'>
                      <div className="flex items-center justify-start gap-2 ">
                        <h5 className="text-lg font-medium">Age : </h5>
                        <h5 className="text-sm text-gray-600"> {doctor?.dob}</h5>
                      </div>
                      <div className="flex items-center justify-start  gap-2 ">
                        <h5 className="text-lg font-medium">Email : </h5>
                        <h5 className="text-sm text-gray-600"> {doctor?.email}</h5>
                      </div>

                    </div>
                    <div className='flex flex-col gap-2'>
                      <div className="flex items-center justify-start  gap-2 ">
                        <h5 className="text-lg font-medium">Gender :</h5>
                        <h5 className="text-sm text-gray-600">{doctor?.sex}</h5>
                      </div>
                      <div className="flex items-center justify-start  gap-2">
                        <h5 className="text-lg font-medium">Phone :  </h5>
                        <h5 className="text-sm text-gray-600">{doctor?.phone}</h5>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2' >

                      <div className="flex items-center justify-start  gap-2  ">
                        <h5 className="text-lg font-medium">Address :</h5>
                        <h5 className="text-sm text-gray-600">54 Av, Nr 56 Arondement 3 - Paris</h5>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col  mt-[10%] ">
                <div className="mb-2">
                    <h2 className="text-lg font-semibold txt-them ">Medical Information</h2>
                </div>
                <div className='w-full flex bg-white pt-[2%] pb-[5%] ' >

                    <div className='w-[50%] flex flex-col gap-5 '>
                        <div className='w-1/2 pl-2'>
                            <p className='text-gray-600 text-sm font-medium '>SPECIALIZATION*</p>
                            <div className='bg-gray-100 p-2 rounded'>
                                <h5 className='text-gray-800'>{doctor?.department.departmentName}</h5>
                            </div>
                        </div>
                        <div className='w-1/2 pl-2'>
                            <p className='text-gray-600 text-sm font-medium '>MEDICAL EDUCATION*</p>
                            <div className='bg-gray-100 p-2 rounded'>
                                <h5 className='text-gray-800'>{doctor?.designation}</h5>
                            </div>
                        </div>
                        <div className='w-full pl-2'>
                            <p className='text-gray-600 text-sm font-medium '>About me*</p>
                            <div className='bg-gray-100 p-2 rounded'>
                                <h5 className='text-gray-800'>{doctor?.biography}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='w-[50%] '>
                        <div className='w-1/2 pl-2'>
                            <p className='text-gray-600 text-sm font-medium'>EXPERIANCE*</p>
                            <div className='bg-gray-100 p-2 rounded'>
                                <h5 className='text-gray-800'>{doctor?.yearOfExperiance}</h5>
                            </div>
                        </div>
                        <div className='w-1/2 pl-2'>
                            <p className='text-gray-600 text-sm font-medium'>COSULTING FEE*</p>
                            <div className='bg-gray-100 p-2 rounded'>
                                <h5 className='text-gray-800'>{doctor?.consultingFee}</h5>
                            </div>
                        </div>

                    </div>
                </div>
              </div>
             
            </div>

    );

}
 


export default ProfileContainer
