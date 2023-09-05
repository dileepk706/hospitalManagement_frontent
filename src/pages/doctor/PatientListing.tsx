import React from 'react'
import UserListWrapper from '../../components/doctor/userList/UserListWrapper';
type AdminLoginPageProps={

}
const PatientListing:React.FC<AdminLoginPageProps>=()=> {
    return (
        <div className='container mx-auto py-5 flex flex-col relative'>
            <UserListWrapper/>                                                              
        </div>
    );
  }
  
 export default PatientListing

 
