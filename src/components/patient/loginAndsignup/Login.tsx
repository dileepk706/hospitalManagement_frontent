import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { loginWithGoogle as LoginWithGoogle } from '../../../services/patients/patientLogin';

interface LoginProps {
  setIsLogin: any;
}

const Login = ({ setIsLogin }: LoginProps) => {
 
  const [ googleUser, setGoogleUser ] = useState<{access_token: string}>();
  const [ googleProfile, setGoogleProfile ] = useState<{
    name: string;
    email: string;
    picture: string;
  } | null>();

  const loginWithGoole = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });
  useEffect(() => {
    const fetchGoogleProfile = async () => {
      if (googleUser) {
        try {
          const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
            headers: {
              Authorization: `Bearer ${googleUser?.access_token}`,
              Accept: 'application/json',
            },
          });
          setGoogleProfile(res.data);
          const user = await LoginWithGoogle(res?.data?.email, res?.data?.name, res?.data?.picture);
          console.log(user);
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    fetchGoogleProfile();
  }, [googleUser]);
  
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setGoogleProfile(null);
    setIsLogin(false);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {googleProfile ? (
        <div>
            <img src={googleProfile.picture} alt="" />
          <h3>User Logged in</h3>
          <p>Name: {googleProfile.name}</p>
          <p>Email Address: {googleProfile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <>
        <button onClick={() => loginWithGoole()}>Sign in with Google 🚀 </button>
        <button onClick={() => setIsLogin(false)}>signup</button>
        </>
        

      )}
    </div>
  );
};

export default Login;
