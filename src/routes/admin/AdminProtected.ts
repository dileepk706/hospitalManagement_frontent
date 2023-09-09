import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

interface AdminProtectedProps {
  children: React.ReactElement; // or React.ReactNode if you want to allow any type of children
}

const AdminProtected: React.FC<AdminProtectedProps> = ({ children }) => {
  const adminToken = localStorage.getItem('admintoken')
  

  if (adminToken) { // You can use the boolean value directly for the condition
    return children;
  } else {
    Navigate({to:'/admin/login'})
    return null
  }
};

export default AdminProtected;
