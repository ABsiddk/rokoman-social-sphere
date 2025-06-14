
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegistrationForm from '../components/registration/RegistrationForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Register;
