
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import MembersSection from '../components/MembersSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <MembersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
