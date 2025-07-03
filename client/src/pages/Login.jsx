import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
   const navigate = useNavigate();
   const { login } = useAuth();

   const handleLogin = async (credentials) => {
       try {
           await login(userData);
           navigate('/'); // Redirect to home page after successful login
       } catch (error) {
           console.error('Login failed:', error);
           // Handle login error (e.g., show an error message)
       }
   };
   return (
       <div className="login-page">
           <h1>Login</h1>
           <LoginForm onLogin={handleLogin} />
       </div>
   );
}