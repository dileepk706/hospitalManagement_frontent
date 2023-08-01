import React from "react";
import { Navigate } from "react-router-dom";

interface DoctorProtectedRouteProps {
  children: React.ReactElement; // or React.ReactNode if you want to allow any type of children
}

const DoctorProtected: React.FC<DoctorProtectedRouteProps> = ({ children }) => {
  const token = true; // TypeScript will infer the type based on the assigned value

  if (token) { // You can use the boolean value directly for the condition
    return children;
  } else {
    Navigate({to:"/login"})
    return null
  }
};

export default DoctorProtected;
