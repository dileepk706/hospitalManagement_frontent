import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

interface DoctorProtectedRouteProps {
  children: React.ReactElement; // or React.ReactNode if you want to allow any type of children
}

const DoctorProtected: React.FC<DoctorProtectedRouteProps> = ({ children }) => {
  const doctorToken = useAppSelector(state=>state.doctor.accessToken)


  if (doctorToken) { // You can use the boolean value directly for the condition
    return children;
  } else {
    Navigate({to:"/doctor/login"})
    return null
  }
};

export default DoctorProtected;
