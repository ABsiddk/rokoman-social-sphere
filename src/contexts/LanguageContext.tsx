import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.profile': 'View and Edit Profile',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Administration and Properties',
    'nav.login': 'Log in',
    'nav.logout': 'Log out',
    'brand.name': 'OnnoRokom Community',
    
    // Hero Section
    'hero.welcome': 'Welcome to',
    'hero.community': 'OnnoRokom Community',
    'hero.description': 'Join our vibrant community where connections flourish, ideas grow, and opportunities abound. Experience the power of collaborative networking in a secure, private environment.',
    'hero.join': 'Join Our Community',
    'hero.learn': 'Learn More',
    'hero.members': 'Active Members',
    'hero.connections': 'Daily Connections',
    'hero.satisfaction': 'Satisfaction',
    'hero.overview': 'Community Overview',
    'hero.discover': 'Discover what makes us special',
    
    // Features Section
    'features.title': 'Facilities of Our Private Network',
    'features.subtitle': 'Experience premium networking features designed to foster meaningful connections and collaborative opportunities in a secure environment.',
    'features.privacy.title': 'Privacy & Security',
    'features.privacy.desc': 'Your data is protected with end-to-end encryption and advanced security protocols.',
    'features.network.title': 'Exclusive Network',
    'features.network.desc': 'Connect with like-minded individuals in a curated, private community environment.',
    'features.communication.title': 'Real-time Communication',
    'features.communication.desc': 'Instant messaging, video calls, and group discussions to stay connected 24/7.',
    'features.customizable.title': 'Customizable Experience',
    'features.customizable.desc': 'Personalize your profile, preferences, and notifications to suit your needs.',
    'features.global.title': 'Global Reach',
    'features.global.desc': 'Connect with members from around the world while maintaining local community feel.',
    'features.invite.title': 'Invite-Only Access',
    'features.invite.desc': 'Carefully moderated community ensuring quality interactions and meaningful connections.',
    
    // About Section
    'about.title': 'About OnnoRokom Community',
    'about.description1': 'Founded with the vision of creating meaningful connections, OnnoRokom Community is more than just a networking platform. We\'re a carefully curated ecosystem where professionals, creators, and innovators come together to share ideas, collaborate on projects, and build lasting relationships.',
    'about.description2': 'Our commitment to privacy, quality, and authentic engagement sets us apart in the digital landscape. Every member is valued, every connection is meaningful, and every interaction contributes to our collective growth.',
    'about.mission': 'Our Mission',
    'about.mission.desc': 'Empowering connections that matter',
    'about.values': 'Our Values',
    'about.values.desc': 'Authenticity, respect, and growth',
    'about.innovation': 'Innovation Hub',
    'about.innovation.desc': 'Where creative minds meet cutting-edge technology to build the future together.',
    'about.growth': 'Growth Platform',
    'about.growth.desc': 'Accelerate your personal and professional development through meaningful collaborations.',
    'about.journey': 'Join Our Journey',
    'about.journey.desc': 'Be part of a community that\'s reshaping how people connect and collaborate online.',
    'about.getstarted': 'Get Started Today',
    
    // Members Section
    'members.title': 'Some of Our Members',
    'members.subtitle': 'Meet the incredible individuals who make our community vibrant and dynamic. Each member brings unique skills, perspectives, and experiences to our network.',
    'members.connect': 'Connect',
    'members.specialty': 'Specialty',
    'members.viewall': 'View All Members',
    
    // Contact Section - Complete translations
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team. We\'re here to help you connect, grow, and succeed within our community.',
    'contact.getintouch': 'Get In Touch',
    'contact.address': 'Address',
    'contact.address.full': 'OnnoRokom Projukti Limited\n123 Community Street, Level 5\nDhanmondi, Dhaka 1205\nBangladesh',
    'contact.phone': 'Phone',
    'contact.phone.mobile': '+880 1234-567890',
    'contact.phone.office': '+880 2-9876543 (Office)',
    'contact.email': 'Email',
    'contact.email.info': 'info@onnorokom.com',
    'contact.email.support': 'support@onnorokom.com',
    'contact.hours': 'Business Hours',
    'contact.hours.weekday': 'Monday - Friday: 9:00 AM - 6:00 PM',
    'contact.hours.saturday': 'Saturday: 10:00 AM - 4:00 PM',
    'contact.hours.sunday': 'Sunday: Closed',
    'contact.sendmessage': 'Send us a Message',
    'contact.firstname': 'First Name',
    'contact.lastname': 'Last Name',
    'contact.firstname.placeholder': 'Your first name',
    'contact.lastname.placeholder': 'Your last name',
    'contact.email.label': 'Email',
    'contact.email.placeholder': 'your.email@example.com',
    'contact.message': 'Message',
    'contact.message.placeholder': 'How can we help you?',
    'contact.send': 'Send Message',
    'contact.findus': 'Find Us',
    'contact.interactivemap': 'Interactive Map',
    'contact.location': 'Dhanmondi, Dhaka',
    
    // Footer - Complete translations
    'footer.tagline': 'Building connections, fostering growth, and creating opportunities for everyone in our vibrant community.',
    'footer.quicklinks': 'Quick Links',
    'footer.about': 'About Us',
    'footer.contact.page': 'Contact',
    'footer.admin': 'Administration',
    'footer.admin.panel': 'Admin Panel',
    'footer.admin.login': 'Admin Login',
    'footer.admin.properties': 'Properties',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
    'footer.developed': '© 2024 OnnoRokom Community. All rights reserved. | Developed by',
    'footer.company': 'OnnoRokom Projukti Limited',
    
    // Page Content
    'page.profile.title': 'View and Edit Profile',
    'page.profile.subtitle': 'Manage your profile information and preferences',
    'page.dashboard.title': 'Dashboard',
    'page.dashboard.subtitle': 'Your personal community dashboard',
    'page.admin.title': 'Administration and Properties',
    'page.admin.subtitle': 'Manage community settings and properties',
    'page.login.title': 'Log in',
    'page.login.subtitle': 'Access your OnnoRokom Community account',
  },
  bn: {
    // Header
    'nav.home': 'হোম',
    'nav.about': 'সম্পর্কে',
    'nav.profile': 'প্রোফাইল',
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.admin': 'প্রশাসন',
    'nav.login': 'লগইন',
    'nav.logout': 'লগআউট',
    'brand.name': 'অন্নরকম কমিউনিটি',
    
    // Hero Section
    'hero.welcome': 'স্বাগতম',
    'hero.community': 'অন্নরকম কমিউনিটিতে',
    'hero.description': 'আমাদের প্রাণবন্ত কমিউনিটিতে যোগ দিন যেখানে সংযোগ বিকশিত হয়, ধারণা বৃদ্ধি পায় এবং সুযোগ প্রচুর। একটি নিরাপদ, ব্যক্তিগত পরিবেশে সহযোগিতামূলক নেটওয়ার্কিংয়ের শক্তি অনুভব করুন।',
    'hero.join': 'আমাদের কমিউনিটিতে যোগ দিন',
    'hero.learn': 'আরো জানুন',
    'hero.members': 'সক্রিয় সদস্য',
    'hero.connections': 'দৈনিক সংযোগ',
    'hero.satisfaction': 'সন্তুষ্টি',
    'hero.overview': 'কমিউনিটি ওভারভিউ',
    'hero.discover': 'আমাদের বিশেষত্ব আবিষ্কার করুন',
    
    // Features Section
    'features.title': 'আমাদের প্রাইভেট নেটওয়ার্কের সুবিধাসমূহ',
    'features.subtitle': 'একটি নিরাপদ পরিবেশে অর্থপূর্ণ সংযোগ এবং সহযোগিতামূলক সুযোগ বৃদ্ধির জন্য ডিজাইন করা প্রিমিয়াম নেটওয়ার্কিং বৈশিষ্ট্যগুলি অনুভব করুন।',
    'features.privacy.title': 'গোপনীয়তা ও নিরাপত্তা',
    'features.privacy.desc': 'আপনার ডেটা এন্ড-টু-এন্ড এনক্রিপশন এবং উন্নত নিরাপত্তা প্রোটোকল দিয়ে সুরক্ষিত।',
    'features.network.title': 'একচেটিয়া নেটওয়ার্ক',
    'features.network.desc': 'একটি নিয়ন্ত্রিত, ব্যক্তিগত কমিউনিটি পরিবেশে সমমনা ব্যক্তিদের সাথে সংযোগ করুন।',
    'features.communication.title': 'রিয়েল-টাইম যোগাযোগ',
    'features.communication.desc': '২৪/৭ সংযুক্ত থাকার জন্য তাৎক্ষণিক বার্তা, ভিডিও কল এবং গ্রুপ আলোচনা।',
    'features.customizable.title': 'কাস্টমাইজযোগ্য অভিজ্ঞতা',
    'features.customizable.desc': 'আপনার প্রয়োজন অনুযায়ী আপনার প্রোফাইল, পছন্দ এবং বিজ্ঞপ্তি ব্যক্তিগতকৃত করুন।',
    'features.global.title': 'বিশ্বব্যাপী পৌঁছানো',
    'features.global.desc': 'স্থানীয় কমিউনিটির অনুভূতি বজায় রেখে বিশ্বের সদস্যদের সাথে সংযোগ করুন।',
    'features.invite.title': 'আমন্ত্রণ-শুধু অ্যাক্সেস',
    'features.invite.desc': 'মানসম্পন্ন মিথস্ক্রিয় এবং অর্থপূর্ণ সংযোগ নিশ্চিত করে সাবধানে মডারেট করা কমিউনিটি।',
    
    // About Section
    'about.title': 'অন্নরকম কমিউনিটি সম্পর্কে',
    'about.description1': 'অর্থপূর্ণ সংযোগ তৈরির দৃষ্টিভঙ্গি নিয়ে প্রতিষ্ঠিত, অন্নরকম কমিউনিটি শুধু একটি নেটওয়ার্কিং প্ল্যাটফর্মের চেয়ে বেশি। আমরা একটি সাবধানে নিয়ন্ত্রিত ইকোসিস্টেম যেখানে পেশাদার, সৃষ্টিকর্তা এবং উদ্ভাবকরা ধারণা শেয়ার করতে, প্রকল্পে সহযোগিতা করতে এবং দীর্ঘস্থায়ী সম্পর্ক গড়তে একসাথে আসেন।',
    'about.description2': 'গোপনীয়তা, গুণমান এবং প্রামাণিক সম্পৃক্ততার প্রতি আমাদের প্রতিশ্রুতি ডিজিটাল ল্যান্ডস্কেপে আমাদের আলাদা করে তোলে। প্রতিটি সদস্য মূল্যবান, প্রতিটি সংযোগ অর্থপূর্ণ, এবং প্রতিটি মিথস্ক্রিয় আমাদের সামগ্রিক বৃদ্ধিতে অবদান রাখে।',
    'about.mission': 'আমাদের মিশন',
    'about.mission.desc': 'গুরুত্বপূর্ণ সংযোগ ক্ষমতায়ন',
    'about.values': 'আমাদের মূল্যবোধ',
    'about.values.desc': 'সত্যতা, সম্মান এবং বৃদ্ধি',
    'about.innovation': 'উদ্ভাবন কেন্দ্র',
    'about.innovation.desc': 'যেখানে সৃজনশীল মন অত্যাধুনিক প্রযুক্তির সাথে মিলিত হয়ে একসাথে ভবিষ্যত গড়ে তোলে।',
    'about.growth': 'বৃদ্ধির প্ল্যাটফর্ম',
    'about.growth.desc': 'অর্থপূর্ণ সহযোগিতার মাধ্যমে আপনার ব্যক্তিগত এবং পেশাগত উন্নয়ন ত্বরান্বিত করুন।',
    'about.journey': 'আমাদের যাত্রায় যোগ দিন',
    'about.journey.desc': 'এমন একটি কমিউনিটির অংশ হন যা মানুষ কীভাবে অনলাইনে সংযোগ এবং সহযোগিতা করে তা পুনর্গঠন করছে।',
    'about.getstarted': 'আজই শুরু করুন',
    
    // Members Section
    'members.title': 'আমাদের কিছু সদস্য',
    'members.subtitle': 'অবিশ্বাস্য ব্যক্তিদের সাথে পরিচিত হন যারা আমাদের কমিউনিটিকে প্রাণবন্ত এবং গতিশীল করে তোলে। প্রতিটি সদস্য আমাদের নেটওয়ার্কে অনন্য দক্ষতা, দৃষ্টিভঙ্গি এবং অভিজ্ঞতা নিয়ে আসে।',
    'members.connect': 'সংযোগ করুন',
    'members.specialty': 'বিশেষত্ব',
    'members.viewall': 'সব সদস্য দেখুন',
    
    // Contact Section - Complete translations
    'contact.title': 'যোগাযোগ করুন',
    'contact.subtitle': 'আমাদের দলের সাথে যোগাযোগ করুন। আমরা আমাদের কমিউনিটির মধ্যে আপনাকে সংযুক্ত, বৃদ্ধি এবং সফল হতে সাহায্য করার জন্য এখানে আছি।',
    'contact.getintouch': 'যোগাযোগ করুন',
    'contact.address': 'ঠিকানা',
    'contact.address.full': 'অন্নরকম প্রযুক্তি লিমিটেড\n১২৩ কমিউনিটি স্ট্রিট, লেভেল ৫\nধানমন্ডি, ঢাকা ১২০৫\nবাংলাদেশ',
    'contact.phone': 'ফোন',
    'contact.phone.mobile': '+৮৮০ ১২৩৪-৫৬৭৮৯০',
    'contact.phone.office': '+৮৮০ ২-৯৮৭৬৫৪৩ (অফিস)',
    'contact.email': 'ইমেইল',
    'contact.email.info': 'info@onnorokom.com',
    'contact.email.support': 'support@onnorokom.com',
    'contact.hours': 'ব্যবসার সময়',
    'contact.hours.weekday': 'সোমবার - শুক্রবার: সকাল ৯:০০ - সন্ধ্যা ৬:০০',
    'contact.hours.saturday': 'শনিবার: সকাল ১০:০০ - বিকাল ৪:০০',
    'contact.hours.sunday': 'রবিবার: বন্ধ',
    'contact.sendmessage': 'আমাদের একটি বার্তা পাঠান',
    'contact.firstname': 'প্রথম নাম',
    'contact.lastname': 'শেষ নাম',
    'contact.firstname.placeholder': 'আপনার প্রথম নাম',
    'contact.lastname.placeholder': 'আপনার শেষ নাম',
    'contact.email.label': 'ইমেইল',
    'contact.email.placeholder': 'your.email@example.com',
    'contact.message': 'বার্তা',
    'contact.message.placeholder': 'আমরা আপনাকে কীভাবে সাহায্য করতে পারি?',
    'contact.send': 'বার্তা পাঠান',
    'contact.findus': 'আমাদের খুঁজুন',
    'contact.interactivemap': 'ইন্টারঅ্যাক্টিভ মানচিত্র',
    'contact.location': 'ধানমন্ডি, ঢাকা',
    
    // Footer - Complete translations
    'footer.tagline': 'আমাদের প্রাণবন্ত কমিউনিটিতে সবার জন্য সংযোগ তৈরি, বৃদ্ধি বৃদ্ধি এবং সুযোগ সৃষ্টি।',
    'footer.quicklinks': 'দ্রুত লিঙ্ক',
    'footer.about': 'আমাদের সম্পর্কে',
    'footer.contact.page': 'যোগাযোগ',
    'footer.admin': 'প্রশাসন',
    'footer.admin.panel': 'অ্যাডমিন প্যানেল',
    'footer.admin.login': 'অ্যাডমিন লগইন',
    'footer.admin.properties': 'সম্পত্তি',
    'footer.privacy': 'গোপনীয়তা নীতি',
    'footer.terms': 'সেবার শর্তাবলী',
    'footer.contact': 'যোগাযোগ',
    'footer.developed': '© ২০২৪ অন্নরকম কমিউনিটি। সমস্ত অধিকার সংরক্ষিত। | ডেভেলপ করেছে',
    'footer.company': 'অন্নরকম প্রযুক্তি লিমিটেড',
    
    // Page Content
    'page.profile.title': 'প্রোফাইল দেখুন ও সম্পাদনা করুন',
    'page.profile.subtitle': 'আপনার প্রোফাইল তথ্য এবং পছন্দ পরিচালনা করুন',
    'page.dashboard.title': 'ড্যাশবোর্ড',
    'page.dashboard.subtitle': 'আপনার ব্যক্তিগত কমিউনিটি ড্যাশবোর্ড',
    'page.admin.title': 'প্রশাসন ও সম্পত্তি',
    'page.admin.subtitle': 'কমিউনিটি সেটিংস এবং সম্পত্তি পরিচালনা করুন',
    'page.login.title': 'লগ ইন',
    'page.login.subtitle': 'আপনার অন্নরকম কমিউনিটি অ্যাকাউন্ট অ্যাক্সেস করুন',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
