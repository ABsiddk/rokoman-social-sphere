
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LiquidGlassButton from "./ui/LiquidGlassButton";

const MembersSection = () => {
  const { t } = useLanguage();

  const members = [
    {
      name: "Sarah Johnson",
      role: "Tech Entrepreneur",
      location: "Dhaka, Bangladesh",
      avatar: "photo-1649972904349-6e44c42644a7",
      rating: 5,
      specialty: "AI & Machine Learning"
    },
    {
      name: "Ahmed Rahman",
      role: "Digital Marketing Expert", 
      location: "Chittagong, Bangladesh",
      avatar: "photo-1488590528505-98d2b5aba04b",
      rating: 5,
      specialty: "Brand Strategy"
    },
    {
      name: "Lisa Chen",
      role: "UX Designer",
      location: "Sylhet, Bangladesh", 
      avatar: "photo-1581091226825-a6a2a5aee158",
      rating: 4,
      specialty: "User Experience"
    },
    {
      name: "Michael Torres",
      role: "Community Manager",
      location: "Rajshahi, Bangladesh",
      avatar: "photo-1605810230434-7631ac76ec81",
      rating: 5,
      specialty: "Community Building"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {t('members.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('members.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative">
                <img
                  src={`https://images.unsplash.com/${member.avatar}?w=400&h=300&fit=crop`}
                  alt={member.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">{member.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {member.role}
                </p>
                <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {member.location}
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-orange-100 dark:from-blue-900 dark:to-orange-900 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('members.specialty')}: {member.specialty}
                  </p>
                </div>
                <LiquidGlassButton className="w-full mt-4 font-semibold py-2 rounded-lg text-white dark:text-cyan-100 bg-gradient-to-r from-blue-500/80 to-orange-500/80 hover:from-blue-600 hover:to-orange-600 transition-all duration-200">
                  {t('members.connect')}
                </LiquidGlassButton>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <LiquidGlassButton className="bg-gray-800 dark:bg-white text-white dark:text-gray-800 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
            {t('members.viewall')}
          </LiquidGlassButton>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
