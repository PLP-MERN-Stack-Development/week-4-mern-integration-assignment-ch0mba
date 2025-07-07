import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '@/components/RegisterForm';
import { authService } from '@/services/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
  try {
    await authService.register(formData);
    navigate('/login'); // or wherever you want to redirect after registration
  } catch (err) {
    setError(err.response?.data?.message || 'Registration failed');
  }
};

  return (
   <div className="Register-From">
              <RegisterForm onRegister={handleRegister} />
          </div>
  );
}