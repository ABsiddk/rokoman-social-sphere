
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            View and Edit Profile
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Manage your profile information and preferences
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
