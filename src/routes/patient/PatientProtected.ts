import React from "react";
import { Navigate } from "react-router-dom";

interface patientProtectedProps {
  children: React.ReactElement; // or React.ReactNode if you want to allow any type of children
}

const PatientProtected: React.FC<patientProtectedProps> = ({ children }) => {
  const token = true; // TypeScript will infer the type based on the assigned value

  if (token) { // You can use the boolean value directly for the condition
    return children;
  } else {
    Navigate({to:"/login"})
    return null
  }
};

export default PatientProtected;
