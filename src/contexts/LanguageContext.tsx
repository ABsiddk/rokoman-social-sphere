
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define the structure of your translations
interface Translation {
  [key: string]: string | Translation;
}

interface LanguageContextType {
  t: (key: string, options?: any) => string;
  i18n: typeof i18n;
  currentLanguage: string;
  language: string;
  changeLanguage: (lng: string) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

const translations = {
  en: {
    nav: {
      home: "Home",
      profile: "Profile",
      dashboard: "Dashboard",
      admin: "Admin",
      login: "Login",
      logout: "Logout",
      register: "Register",
    },
    index: {
      hero: {
        title: "Find the best talent",
        subtitle: "Discover, connect, and hire top-notch professionals in any field.",
        getStarted: "Get Started",
        learnMore: "Learn More",
      },
      features: {
        title: "Key Features",
        card1Title: "Advanced Search",
        card1Description: "Find candidates using detailed filters.",
        card2Title: "Profile Matching",
        card2Description: "AI-powered matching for the perfect fit.",
        card3Title: "Direct Messaging",
        card3Description: "Communicate directly with potential hires.",
      },
      about: {
        title: "About Us",
        content: "We revolutionize hiring with innovative solutions.",
      },
      members: {
        title: "Our Team",
        member1: "John Doe",
        member1Title: "CEO",
        member2: "Jane Smith",
        member2Title: "CTO",
      },
      contact: {
        title: "Contact Us",
        description: "Reach out for inquiries and support.",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
      },
    },
    profile: {
      title: "Profile",
      subtitle: "Manage your profile information",
      name: "Name",
      email: "Email",
      phone: "Phone",
      password: "Password",
      namePlaceholder: "Enter your name",
      emailPlaceholder: "Enter your email",
      phonePlaceholder: "Enter your phone number",
      passwordPlaceholder: "Enter your password",
      nameEmpty: "Name not set",
      emailEmpty: "Email not set",
      phoneEmpty: "Phone not set",
      passwordEmpty: "Password not set",
      phoneSecurity: "Phone Number and Security",
      passwordSecurity: "Password and Security",
      edit: "Edit",
      save: "Save",
      cancel: "Cancel",
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Overview of your account",
      login: {
        required: "Login Required",
        message: "Please log in to access the dashboard.",
      }
    },
    admin: {
      title: "Admin Panel",
      subtitle: "Manage users and system settings",
    },
    login: {
      title: "Login",
      subtitle: "Enter your credentials to access your account",
      email: "Email",
      password: "Password",
      emailPlaceholder: "Enter your email",
      passwordPlaceholder: "Enter your password",
      submit: "Login",
      registerLink: "Don't have an account? Register here",
    },
    register: {
      title: "Register",
      subtitle: "Create a new account",
      name: "Name",
      email: "Email",
      password: "Password",
      namePlaceholder: "Enter your name",
      emailPlaceholder: "Enter your email",
      passwordPlaceholder: "Enter your password",
      submit: "Register",
      loginLink: "Already have an account? Login here",
    },
    register1: {
      title: "Register",
      subtitle: "Create a new account",
      next: "Next",
    },
    register2: {
      title: "Register",
      subtitle: "Create a new account",
      previous: "Previous",
      next: "Next",
    },
    register3: {
      title: "Register",
      subtitle: "Create a new account",
      previous: "Previous",
      submit: "Submit",
    },
    notFound: {
      title: "404 Not Found",
      subtitle: "The page you are looking for does not exist.",
      backHome: "Back to Home",
    },
    sidebar: {
      dashboard: "Dashboard",
      deepSearch: "Deep Search", 
      newProfile: "New Profile",
      propertiesSettings: "Properties Settings",
      csvManagement: "CSV Management"
    },
    deepSearch: {
      title: "Deep Search",
      subtitle: "Advanced search with image, voice, and text capabilities",
      searchPlaceholder: "Search users by name, email, profession, location..."
    },
    newProfile: {
      title: "New Profile",
      subtitle: "Create new user profiles with enhanced features"
    },
    propertiesSettings: {
      title: "Properties Settings", 
      subtitle: "Configure application settings and preferences"
    },
    csvManagement: {
      title: "CSV File Management",
      subtitle: "Import and export user data via CSV files"
    },
    common: {
      save: "Save",
      cancel: "Cancel"
    }
  },
  bn: {
    nav: {
      home: "হোম",
      profile: "প্রোফাইল",
      dashboard: "ড্যাশবোর্ড",
      admin: "এডমিন",
      login: "লগইন",
      logout: "লগআউট",
      register: "রেজিস্টার",
    },
    index: {
      hero: {
        title: "সেরা প্রতিভা খুঁজুন",
        subtitle: "যেকোনো ক্ষেত্রে সেরা পেশাদারদের আবিষ্কার করুন, সংযোগ করুন এবং নিয়োগ করুন।",
        getStarted: "শুরু করুন",
        learnMore: "আরও জানুন",
      },
      features: {
        title: "প্রধান বৈশিষ্ট্য",
        card1Title: "উন্নত অনুসন্ধান",
        card1Description: "বিস্তারিত ফিল্টার ব্যবহার করে প্রার্থী খুঁজুন।",
        card2Title: "প্রোফাইল ম্যাচিং",
        card2Description: "পারফেক্ট ফিটের জন্য এআই-চালিত ম্যাচিং।",
        card3Title: "সরাসরি মেসেজিং",
        card3Description: "সম্ভাব্য নিয়োগকারীদের সাথে সরাসরি যোগাযোগ করুন।",
      },
      about: {
        title: "আমাদের সম্পর্কে",
        content: "আমরা উদ্ভাবনী সমাধান দিয়ে নিয়োগে বিপ্লব করি।",
      },
      members: {
        title: "আমাদের দল",
        member1: "জন ডো",
        member1Title: "সিইও",
        member2: "জেন স্মিথ",
        member2Title: "সিটিও",
      },
      contact: {
        title: "যোগাযোগ করুন",
        description: "অনুসন্ধান এবং সহায়তার জন্য যোগাযোগ করুন।",
        name: "নাম",
        email: "ইমেইল",
        message: "বার্তা",
        send: "বার্তা পাঠান",
      },
    },
    profile: {
      title: "প্রোফাইল",
      subtitle: "আপনার প্রোফাইলের তথ্য পরিচালনা করুন",
      name: "নাম",
      email: "ইমেইল",
      phone: "ফোন",
      password: "পাসওয়ার্ড",
      namePlaceholder: "আপনার নাম প্রবেশ করুন",
      emailPlaceholder: "আপনার ইমেইল প্রবেশ করুন",
      phonePlaceholder: "আপনার ফোন নম্বর প্রবেশ করুন",
      passwordPlaceholder: "আপনার পাসওয়ার্ড প্রবেশ করুন",
      nameEmpty: "নাম সেট করা নেই",
      emailEmpty: "ইমেইল সেট করা নেই",
      phoneEmpty: "ফোন সেট করা নেই",
      passwordEmpty: "পাসওয়ার্ড সেট করা নেই",
      phoneSecurity: "ফোন নম্বর এবং নিরাপত্তা",
      passwordSecurity: "পাসওয়ার্ড এবং নিরাপত্তা",
      edit: "সম্পাদনা করুন",
      save: "সংরক্ষণ করুন",
      cancel: "বাতিল করুন",
    },
    dashboard: {
      title: "ড্যাশবোর্ড",
      subtitle: "আপনার অ্যাকাউন্টের সংক্ষিপ্ত বিবরণ",
      login: {
        required: "লগইন প্রয়োজন",
        message: "ড্যাশবোর্ড অ্যাক্সেস করতে লগইন করুন.",
      }
    },
    admin: {
      title: "এডমিন প্যানেল",
      subtitle: "ব্যবহারকারী এবং সিস্টেম সেটিংস পরিচালনা করুন",
    },
    login: {
      title: "লগইন",
      subtitle: "আপনার অ্যাকাউন্টে প্রবেশ করার জন্য আপনার প্রমাণপত্র লিখুন",
      email: "ইমেইল",
      password: "পাসওয়ার্ড",
      emailPlaceholder: "আপনার ইমেইল প্রবেশ করুন",
      passwordPlaceholder: "আপনার পাসওয়ার্ড প্রবেশ করুন",
      submit: "লগইন",
      registerLink: "অ্যাকাউন্ট নেই? এখানে রেজিস্টার করুন",
    },
    register: {
      title: "রেজিস্টার",
      subtitle: "নতুন অ্যাকাউন্ট তৈরি করুন",
      name: "নাম",
      email: "ইমেইল",
      password: "পাসওয়ার্ড",
      namePlaceholder: "আপনার নাম প্রবেশ করুন",
      emailPlaceholder: "আপনার ইমেইল প্রবেশ করুন",
      passwordPlaceholder: "আপনার পাসওয়ার্ড প্রবেশ করুন",
      submit: "রেজিস্টার",
      loginLink: "ইতিমধ্যে একটি অ্যাকাউন্ট আছে? লগইন করুন",
    },
    register1: {
      title: "রেজিস্টার",
      subtitle: "নতুন অ্যাকাউন্ট তৈরি করুন",
      next: "পরবর্তী",
    },
    register2: {
      title: "রেজিস্টার",
      subtitle: "নতুন অ্যাকাউন্ট তৈরি করুন",
      previous: "আগে",
      next: "পরবর্তী",
    },
    register3: {
      title: "রেজিস্টার",
      subtitle: "নতুন অ্যাকাউন্ট তৈরি করুন",
      previous: "আগে",
      submit: "জমা দিন",
    },
    notFound: {
      title: "404 খুঁজে পাওয়া যায়নি",
      subtitle: "আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই।",
      backHome: "হোমে ফিরে যান",
    },
    sidebar: {
      dashboard: "ড্যাশবোর্ড",
      deepSearch: "গভীর অনুসন্ধান",
      newProfile: "নতুন প্রোফাইল", 
      propertiesSettings: "বৈশিষ্ট্য সেটিংস",
      csvManagement: "CSV ফাইল ব্যবস্থাপনা"
    },
    deepSearch: {
      title: "গভীর অনুসন্ধান",
      subtitle: "ছবি, ভয়েস এবং টেক্সট ক্ষমতা সহ উন্নত অনুসন্ধান",
      searchPlaceholder: "নাম, ইমেইল, পেশা, অবস্থান দিয়ে ব্যবহারকারী খুঁজুন..."
    },
    newProfile: {
      title: "নতুন প্রোফাইল",
      subtitle: "উন্নত বৈশিষ্ট্য সহ নতুন ব্যবহারকারী প্রোফাইল তৈরি করুন"
    },
    propertiesSettings: {
      title: "বৈশিষ্ট্য সেটিংস",
      subtitle: "অ্যাপ্লিকেশন সেটিংস এবং পছন্দসমূহ কনফিগার করুন"
    },
    csvManagement: {
      title: "CSV ফাইল ব্যবস্থাপনা", 
      subtitle: "CSV ফাইলের মাধ্যমে ব্যবহারকারীর তথ্য আমদানি ও রপ্তানি করুন"
    },
    common: {
      save: "সংরক্ষণ করুন",
      cancel: "বাতিল করুন"
    }
  }
};

// Initialize i18n outside of the component
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
      bn: { translation: translations.bn },
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { t, i18n: i18nInstance } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18nInstance.language || 'en');

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18nInstance.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18nInstance.off('languageChanged', handleLanguageChange);
    };
  }, [i18nInstance]);

  const changeLanguage = (lng: string) => {
    i18nInstance.changeLanguage(lng);
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'bn' : 'en';
    changeLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ 
      t, 
      i18n: i18nInstance, 
      currentLanguage, 
      language: currentLanguage, 
      changeLanguage, 
      toggleLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
