import React from "react";
import { Navigate } from "react-router-dom";

interface AdminProtectedProps {
  children: React.ReactElement; // or React.ReactNode if you want to allow any type of children
}

const AdminProtected: React.FC<AdminProtectedProps> = ({ children }) => {
  
  const token = true; // TypeScript will infer the type based on the assigned value

  if (token) { // You can use the boolean value directly for the condition
    return children;
  } else {
    Navigate({to:'/'})
    return null
  }
};

export default AdminProtected;
