
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileForm from '../components/ProfileForm';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { isAuthenticated } = useUser();
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {t('profile.login.required')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('profile.login.message')}
            </p>
            <Link to="/login">
              <Button className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90">
                <LogIn size={20} className="mr-2" />
                {t('nav.login')}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-20">
        <ProfileForm />
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
