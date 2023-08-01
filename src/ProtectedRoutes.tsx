import React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface EmployerProtectedProps {
  children: React.ReactElement; // or React.ReactNode if you want to allow any type of children
}

const EmployerProtected: React.FC<EmployerProtectedProps> = ({ children }) => {
  const token = true; // TypeScript will infer the type based on the assigned value
  console.log('sdgsgdffhdfhfhgfhgfhfhgf');
  const navigate=useNavigate()

  if (token) { // You can use the boolean value directly for the condition
    return children;
  } else {
    navigate('/')
    return null
    // return <Navigate to="/login" />;
  }
};

export default EmployerProtected;
