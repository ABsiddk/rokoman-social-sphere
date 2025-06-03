
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegistrationForm from '../components/RegistrationForm';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Register = () => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-20">
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Register;
