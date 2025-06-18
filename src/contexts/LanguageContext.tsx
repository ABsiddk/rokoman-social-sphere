
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
      personal: {
        info: "Personal Information"
      },
      address: {
        info: "Address Information"
      },
      professional: {
        info: "Professional Information"
      },
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
      step1: {
        title: "Account Setup",
        subtitle: "Enter your phone number and password",
        phone: "Phone Number",
        phonePlaceholder: "Enter your phone number",
        password: "Password",
        passwordPlaceholder: "Enter your password",
        confirmPassword: "Confirm Password",
        confirmPasswordPlaceholder: "Confirm your password",
        countryCode: "Country Code",
        next: "Next",
        errors: {
          phoneRequired: "Phone number is required",
          phoneInvalid: "Please enter a valid phone number",
          passwordRequired: "Password is required",
          passwordTooShort: "Password must be at least 8 characters",
          passwordMismatch: "Passwords do not match"
        }
      },
      step2: {
        title: "Personal Information",
        subtitle: "Tell us about yourself",
        full_name: "Full Name",
        full_name_placeholder: "Enter your full name",
        nickname: "Nickname",
        nickname_placeholder: "Enter your nickname",
        date_of_birth: "Date of Birth",
        date_of_birth_placeholder: "Select your date of birth",
        gender: "Gender",
        gender_placeholder: "Select your gender",
        religion: "Religion",
        religion_placeholder: "Select your religion",
        marital_status: "Marital Status",
        marital_placeholder: "Select your marital status",
        personal_email: "Personal Email",
        personal_email_placeholder: "Enter your personal email",
        additional_phone: "Additional Phone",
        additional_phone_placeholder: "Enter additional phone number",
        save_continue: "Save & Continue",
        previous: "Previous",
        errors: {
          fullNameRequired: "Full name is required",
          emailInvalid: "Please enter a valid email address"
        }
      },
      step3: {
        title: "Address Information",
        subtitle: "Where do you live and work?",
        present_address: "Present Address",
        permanent_address: "Permanent Address",
        workplace_address: "Workplace Address",
        same_as_present: "Same as present address",
        nationality: "Nationality",
        division: "Division",
        district: "District",
        subdistrict: "Sub-district",
        village: "Village/House/Road",
        zipcode: "Zip/Postal Code",
        start_date: "Start Date",
        end_date: "End Date",
        currently_working: "Currently Working Here",
        previous: "Previous",
        next: "Next",
        placeholders: {
          nationality: "Select nationality",
          division: "Select division",
          district: "Select district",
          subdistrict: "Enter sub-district",
          village: "Enter village/house/road",
          zipcode: "Enter zip code"
        },
        errors: {
          division: {
            required: "Division is required"
          },
          district: {
            required: "District is required"
          },
          subdistrict: {
            required: "Sub-district is required"
          }
        }
      },
      step4: {
        title: "Professional Information",
        subtitle: "Tell us about your career",
        profession_type: "Profession Type",
        profession_placeholder: "Select your profession",
        workplace_info: "Workplace Information",
        previous: "Previous",
        submit: "Complete Registration",
        errors: {
          professionRequired: "Profession type is required"
        }
      }
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
      searchPlaceholder: "Search users by name, email, profession, location...",
      filters: {
        title: "Advanced Filters",
        clearAll: "Clear All",
        role: "Role",
        gender: "Gender",
        religion: "Religion",
        maritalStatus: "Marital Status",
        profession: "Profession",
        location: "Location",
        minAge: "Min Age",
        maxAge: "Max Age",
        placeholders: {
          allRoles: "All Roles",
          allGenders: "All Genders",
          allReligions: "All Religions",
          allStatus: "All Status",
          allProfessions: "All Professions",
          allLocations: "All Locations",
          minAge: "Min Age",
          maxAge: "Max Age"
        },
        values: {
          admin: "Admin",
          moderator: "Moderator",
          user: "User",
          male: "Male",
          female: "Female",
          islam: "Islam",
          christianity: "Christianity",
          hinduism: "Hinduism",
          single: "Single",
          married: "Married"
        }
      },
      results: {
        showing: "Showing",
        of: "of",
        results: "results",
        page: "Page",
        noResults: "No Results Found",
        noResultsDescription: "Try adjusting your search query or filters to find more results.",
        previous: "Previous",
        next: "Next"
      },
      viewModes: {
        extraLarge: "Extra Large Icons",
        large: "Large Icons",
        medium: "Medium Icons",
        small: "Small Icons",
        list: "List",
        details: "Details",
        tiles: "Tiles"
      },
      sort: {
        name: "Name",
        joinDate: "Join Date",
        role: "Role",
        lastLogin: "Last Login"
      },
      download: "Download Results"
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
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Information"
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
      personal: {
        info: "ব্যক্তিগত তথ্য"
      },
      address: {
        info: "ঠিকানার তথ্য"
      },
      professional: {
        info: "পেশাগত তথ্য"
      },
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
      step1: {
        title: "অ্যাকাউন্ট সেটআপ",
        subtitle: "আপনার ফোন নম্বর এবং পাসওয়ার্ড লিখুন",
        phone: "ফোন নম্বর",
        phonePlaceholder: "আপনার ফোন নম্বর লিখুন",
        password: "পাসওয়ার্ড",
        passwordPlaceholder: "আপনার পাসওয়ার্ড লিখুন",
        confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
        confirmPasswordPlaceholder: "আপনার পাসওয়ার্ড নিশ্চিত করুন",
        countryCode: "দেশের কোড",
        next: "পরবর্তী",
        errors: {
          phoneRequired: "ফোন নম্বর প্রয়োজন",
          phoneInvalid: "অনুগ্রহ করে একটি বৈধ ফোন নম্বর লিখুন",
          passwordRequired: "পাসওয়ার্ড প্রয়োজন",
          passwordTooShort: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
          passwordMismatch: "পাসওয়ার্ড মিলছে না"
        }
      },
      step2: {
        title: "ব্যক্তিগত তথ্য",
        subtitle: "আপনার সম্পর্কে আমাদের বলুন",
        full_name: "পূর্ণ নাম",
        full_name_placeholder: "আপনার পূর্ণ নাম লিখুন",
        nickname: "ডাকনাম",
        nickname_placeholder: "আপনার ডাকনাম লিখুন",
        date_of_birth: "জন্ম তারিখ",
        date_of_birth_placeholder: "আপনার জন্ম তারিখ নির্বাচন করুন",
        gender: "লিঙ্গ",
        gender_placeholder: "আপনার লিঙ্গ নির্বাচন করুন",
        religion: "ধর্ম",
        religion_placeholder: "আপনার ধর্ম নির্বাচন করুন",
        marital_status: "বৈবাহিক অবস্থা",
        marital_placeholder: "আপনার বৈবাহিক অবস্থা নির্বাচন করুন",
        personal_email: "ব্যক্তিগত ইমেইল",
        personal_email_placeholder: "আপনার ব্যক্তিগত ইমেইল লিখুন",
        additional_phone: "অতিরিক্ত ফোন",
        additional_phone_placeholder: "অতিরিক্ত ফোন নম্বর লিখুন",
        save_continue: "সংরক্ষণ করুন এবং এগিয়ে যান",
        previous: "পূর্ববর্তী",
        errors: {
          fullNameRequired: "পূর্ণ নাম প্রয়োজন",
          emailInvalid: "অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা লিখুন"
        }
      },
      step3: {
        title: "ঠিকানার তথ্য",
        subtitle: "আপনি কোথায় থাকেন এবং কাজ করেন?",
        present_address: "বর্তমান ঠিকানা",
        permanent_address: "স্থায়ী ঠিকানা",
        workplace_address: "কর্মক্ষেত্রের ঠিকানা",
        same_as_present: "বর্তমান ঠিকানার মতো",
        nationality: "জাতীয়তা",
        division: "বিভাগ",
        district: "জেলা",
        subdistrict: "উপজেলা",
        village: "গ্রাম/বাড়ি/রাস্তা",
        zipcode: "জিপ/পোস্টাল কোড",
        start_date: "শুরুর তারিখ",
        end_date: "শেষের তারিখ",
        currently_working: "বর্তমানে এখানে কাজ করছি",
        previous: "পূর্ববর্তী",
        next: "পরবর্তী",
        placeholders: {
          nationality: "জাতীয়তা নির্বাচন করুন",
          division: "বিভাগ নির্বাচন করুন",
          district: "জেলা নির্বাচন করুন",
          subdistrict: "উপজেলা লিখুন",
          village: "গ্রাম/বাড়ি/রাস্তা লিখুন",
          zipcode: "জিপ কোড লিখুন"
        },
        errors: {
          division: {
            required: "বিভাগ প্রয়োজন"
          },
          district: {
            required: "জেলা প্রয়োজন"
          },
          subdistrict: {
            required: "উপজেলা প্রয়োজন"
          }
        }
      },
      step4: {
        title: "পেশাগত তথ্য",
        subtitle: "আপনার ক্যারিয়ার সম্পর্কে আমাদের বলুন",
        profession_type: "পেশার ধরন",
        profession_placeholder: "আপনার পেশা নির্বাচন করুন",
        workplace_info: "কর্মক্ষেত্রের তথ্য",
        previous: "পূর্ববর্তী",
        submit: "নিবন্ধন সম্পূর্ণ করুন",
        errors: {
          professionRequired: "পেশার ধরন প্রয়োজন"
        }
      }
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
      searchPlaceholder: "নাম, ইমেইল, পেশা, অবস্থান দিয়ে ব্যবহারকারী খুঁজুন...",
      filters: {
        title: "উন্নত ফিল্টার",
        clearAll: "সব মুছুন",
        role: "ভূমিকা",
        gender: "লিঙ্গ",
        religion: "ধর্ম",
        maritalStatus: "বৈবাহিক অবস্থা",
        profession: "পেশা",
        location: "অবস্থান",
        minAge: "সর্বনিম্ন বয়স",
        maxAge: "সর্বোচ্চ বয়স",
        placeholders: {
          allRoles: "সব ভূমিকা",
          allGenders: "সব লিঙ্গ",
          allReligions: "সব ধর্ম",
          allStatus: "সব অবস্থা",
          allProfessions: "সব পেশা",
          allLocations: "সব অবস্থান",
          minAge: "সর্বনিম্ন বয়স",
          maxAge: "সর্বোচ্চ বয়স"
        },
        values: {
          admin: "এডমিন",
          moderator: "মডারেটর",
          user: "ব্যবহারকারী",
          male: "পুরুষ",
          female: "মহিলা",
          islam: "ইসলাম",
          christianity: "খ্রিস্টধর্ম",
          hinduism: "হিন্দুধর্ম",
          single: "অবিবাহিত",
          married: "বিবাহিত"
        }
      },
      results: {
        showing: "দেখানো হচ্ছে",
        of: "এর মধ্যে",
        results: "ফলাফল",
        page: "পৃষ্ঠা",
        noResults: "কোনো ফলাফল পাওয়া যায়নি",
        noResultsDescription: "আরও ফলাফল খুঁজতে আপনার অনুসন্ধান বা ফিল্টার সমন্বয় করুন।",
        previous: "পূর্ববর্তী",
        next: "পরবর্তী"
      },
      viewModes: {
        extraLarge: "অতিরিক্ত বড় আইকন",
        large: "বড় আইকন",
        medium: "মাঝারি আইকন",
        small: "ছোট আইকন",
        list: "তালিকা",
        details: "বিস্তারিত",
        tiles: "টাইল"
      },
      sort: {
        name: "নাম",
        joinDate: "যোগদানের তারিখ",
        role: "ভূমিকা",
        lastLogin: "শেষ লগইন"
      },
      download: "ফলাফল ডাউনলোড করুন"
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
      cancel: "বাতিল করুন",
      edit: "সম্পাদনা করুন",
      delete: "মুছুন",
      confirm: "নিশ্চিত করুন",
      loading: "লোড হচ্ছে...",
      error: "ত্রুটি",
      success: "সফল",
      warning: "সতর্কতা",
      info: "তথ্য"
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
