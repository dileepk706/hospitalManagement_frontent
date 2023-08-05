import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from '../../pages/admin/adminHomePage';
import AdminProtected from './AdminProtected';

interface applicationType  {}
                          
const AdminRouter:React.FC<applicationType>=()=> {

  return (
      <Routes>
        <Route path='/' element={<AdminProtected><AdminHome /></AdminProtected>} />
      </Routes>
  ); 
}
export default AdminRouter;