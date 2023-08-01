import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from '../../pages/admin/adminHomePage';
import AdminProtected from './AdminProtected';

interface applicationType  {}
                          
const AdminRouter:React.FC<applicationType>=()=> {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<AdminProtected><AdminHome /></AdminProtected>} />
      </Routes>
    </BrowserRouter>
  ); 
}
export default AdminRouter;