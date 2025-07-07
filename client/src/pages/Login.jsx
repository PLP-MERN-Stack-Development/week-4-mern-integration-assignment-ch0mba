import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';


export default function Login() {
   const navigate = useNavigate();
   const { login } = useAuth();

   const handleLogin = async (credentials) => {
       try {
           await login(credentials);
           navigate('/'); // Redirect to home page after successful login
       } catch (error) {
           console.error('Login failed:', error);
           // Handle login error (e.g., show an error message)
       }
   };
   return (
       <div className="login-page">
           <LoginForm onLogin={handleLogin} />
       </div>
   );
}