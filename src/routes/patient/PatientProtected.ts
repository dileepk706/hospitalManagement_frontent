import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../../redux/hooks';

interface patientProtectedProps {
  children: React.ReactElement; // or React.ReactNode if you want to allow any type of children
}

const PatientProtected: React.FC<patientProtectedProps> = ({ children }) => {
  const userToken = localStorage.getItem('usertoken')
  
  if (userToken) {// You can use the boolean value directly for the condition
    return children;
  } else {
    Navigate({to:"/login"})
    return null
  }
};

export default PatientProtected;
