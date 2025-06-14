
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Brand
    'brand.name': 'OnnoRokom',
    
    // Navigation
    'nav.home': 'Home',
    'nav.profile': 'Profile',
    'nav.dashboard': 'Dashboard', 
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Common
    'common.back': 'Back',
    'common.next': 'Next',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.edit': 'Edit',
    'common.required': 'Required',
    'common.optional': 'Optional',
    
    // Registration
    'register.title': 'Create Your OnnoRokom Account',
    'register.subtitle': 'Join our community and get started',
    'register.verify': 'Verify',
    
    // Step 1 - Phone & Password
    'register.step1.title': 'Phone & Password',
    'register.step1.phone': 'Phone Number',
    'register.step1.phone_placeholder': 'Enter your 11-digit phone number',
    'register.step1.password': 'New Password',
    'register.step1.password_placeholder': 'Create a strong password',
    'register.step1.confirm_password': 'Confirm Password',
    'register.step1.confirm_placeholder': 'Re-enter your password',
    'register.step1.password_requirements': 'Password must contain: 8+ characters, uppercase, lowercase, number, and special character',
    'register.step1.send_otp': 'Send OTP',
    'register.step1.phone_confirmation': 'Confirm Your Phone Number',
    'register.step1.edit_phone': 'Edit Phone Number',
    'register.step1.confirm_phone': 'Confirm & Send OTP',
    
    // Step 2 - Personal Info
    'register.step2.title': 'Personal Information',
    'register.step2.full_name': 'Full Name',
    'register.step2.full_name_placeholder': 'Enter your full name as per certificate',
    'register.step2.nickname': 'Nickname',
    'register.step2.nickname_placeholder': 'Name your friends call you',
    'register.step2.add_nickname': '+ Add Nickname',
    'register.step2.date_of_birth': 'Date of Birth',
    'register.step2.gender': 'Gender',
    'register.step2.religion': 'Religion',
    'register.step2.marital_status': 'Marital Status',
    'register.step2.personal_email': 'Personal Email',
    'register.step2.personal_email_placeholder': 'your.email@example.com',
    'register.step2.official_email': 'Official Email',
    'register.step2.official_email_placeholder': 'work.email@company.com',
    'register.step2.additional_phone': 'Additional Phone Number',
    'register.step2.additional_phone_placeholder': 'Alternative phone number',
    'register.step2.add_phone': '+ Add Additional Phone',
    'register.step2.save_continue': 'Save and Continue',
    
    // Step 3 - Address
    'register.step3.title': 'Current and Permanent Address',
    'register.step3.present_address': 'Present Address',
    'register.step3.permanent_address': 'Permanent Address',
    'register.step3.nationality': 'Select Nationality',
    'register.step3.division': 'Select Division',
    'register.step3.district': 'Select District',
    'register.step3.subdistrict': 'Sub-district/Police Station',
    'register.step3.village_house': 'Village/House and Road',
    'register.step3.zip_code': 'ZIP Code',
    'register.step3.same_address': 'Same as Present Address',
    'register.step3.permanent_note': 'Enter your permanent address!',
    
    // Step 4 - Professional
    'register.step4.title': 'Professional Information',
    'register.step4.occupation': 'Occupation',
    'register.step4.business_type': 'Business Type',
    'register.step4.business_subcategory': 'Business Sub-category',
    'register.step4.business_name': 'Business Name',
    'register.step4.designation': 'Designation',
    'register.step4.workplace_address': 'Workplace Address',
    'register.step4.special_note': 'Special Note',
    'register.step4.start_date': 'Start Date',
    'register.step4.end_date': 'End Date',
    'register.step4.currently_working': 'Currently Working',
    'register.step4.job_description': 'Job Description',
    'register.step4.complete_registration': 'Complete Registration',
    
    // OTP Verification
    'register.otp.title': 'Verify Your Phone Number',
    'register.otp.subtitle': 'Check your mobile SMS and enter the OTP accurately in the box below!',
    'register.otp.not_received': "Didn't receive the OTP?",
    'register.otp.resend': 'Send OTP Again',
    'register.otp.autofill': 'Auto-fill demo OTP',
    'register.otp.demo.title': 'Demo OTPs for testing:',
    'register.otp.error.incomplete': 'Please enter complete 6-digit OTP',
    'register.otp.error.invalid': 'Invalid OTP. Please try again.',
    
    // Phone validation
    'registration.phone.error.bangladesh': 'Bangladesh number must start with 01',
    'registration.phone.error.length': 'Phone number must be 11 digits',
    'registration.phone.error.numbers': 'Only numbers are allowed',
    
    // Password validation
    'registration.password.error.length': 'At least 8 characters',
    'registration.password.error.uppercase': 'One uppercase letter',
    'registration.password.error.lowercase': 'One lowercase letter', 
    'registration.password.error.number': 'One number',
    'registration.password.error.special': 'One special character',
    'registration.password.error.match': 'Passwords do not match',
    
    // Dropdowns
    'dropdown.select': 'Select...',
    'dropdown.search': 'Search...',
    
    // Gender options
    'gender.male': 'Male',
    'gender.female': 'Female',
    'gender.other': 'Other',
    
    // Religion options
    'religion.islam': 'Islam',
    'religion.hinduism': 'Hinduism',
    'religion.christianity': 'Christianity',
    'religion.buddhism': 'Buddhism',
    'religion.other': 'Other',
    
    // Marital status
    'marital.single': 'Single',
    'marital.married': 'Married',
    'marital.divorced': 'Divorced',
    'marital.widowed': 'Widowed',
  },
  bn: {
    // Brand  
    'brand.name': 'অন্নরকম',
    
    // Navigation
    'nav.home': 'হোম',
    'nav.profile': 'প্রোফাইল',
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.admin': 'অ্যাডমিন',
    'nav.login': 'লগইন',
    'nav.logout': 'লগআউট',
    
    // Common
    'common.back': 'পিছনে',
    'common.next': 'পরবর্তী',
    'common.save': 'সংরক্ষণ',
    'common.cancel': 'বাতিল',
    'common.confirm': 'নিশ্চিত',
    'common.edit': 'সম্পাদনা',
    'common.required': 'আবশ্যক',
    'common.optional': 'ঐচ্ছিক',
    
    // Registration
    'register.title': 'আপনার অন্নরকম অ্যাকাউন্ট তৈরি করুন',
    'register.subtitle': 'আমাদের কমিউনিটিতে যোগ দিন এবং শুরু করুন',
    'register.verify': 'যাচাই করুন',
    
    // Step 1 - Phone & Password
    'register.step1.title': 'ফোন এবং পাসওয়ার্ড',
    'register.step1.phone': 'ফোন নম্বর',
    'register.step1.phone_placeholder': 'আপনার ১১ সংখ্যার ফোন নম্বর লিখুন',
    'register.step1.password': 'নতুন পাসওয়ার্ড',
    'register.step1.password_placeholder': 'একটি শক্তিশালী পাসওয়ার্ড তৈরি করুন',
    'register.step1.confirm_password': 'পাসওয়ার্ড নিশ্চিত করুন',
    'register.step1.confirm_placeholder': 'আপনার পাসওয়ার্ড পুনরায় লিখুন',
    'register.step1.password_requirements': 'পাসওয়ার্ডে থাকতে হবে: ৮+ অক্ষর, বড় হাতের অক্ষর, ছোট হাতের অক্ষর, সংখ্যা এবং বিশেষ চিহ্ন',
    'register.step1.send_otp': 'ওটিপি পাঠান',
    'register.step1.phone_confirmation': 'আপনার ফোন নম্বর নিশ্চিত করুন',
    'register.step1.edit_phone': 'ফোন নম্বর সম্পাদনা',
    'register.step1.confirm_phone': 'নিশ্চিত করুন এবং ওটিপি পাঠান',
    
    // Step 2 - Personal Info
    'register.step2.title': 'ব্যক্তিগত তথ্য',
    'register.step2.full_name': 'পূর্ণ নাম',
    'register.step2.full_name_placeholder': 'সনদ অনুযায়ী আপনার পূর্ণ নাম লিখুন',
    'register.step2.nickname': 'ডাকনাম',
    'register.step2.nickname_placeholder': 'বন্ধুরা যে নামে ডাকে',
    'register.step2.add_nickname': '+ ডাকনাম যোগ করুন',
    'register.step2.date_of_birth': 'জন্ম তারিখ',
    'register.step2.gender': 'লিঙ্গ',
    'register.step2.religion': 'ধর্ম',
    'register.step2.marital_status': 'বৈবাহিক অবস্থা',
    'register.step2.personal_email': 'ব্যক্তিগত ইমেইল',
    'register.step2.personal_email_placeholder': 'your.email@example.com',
    'register.step2.official_email': 'অফিসিয়াল ইমেইল',
    'register.step2.official_email_placeholder': 'work.email@company.com',
    'register.step2.additional_phone': 'অতিরিক্ত ফোন নম্বর',
    'register.step2.additional_phone_placeholder': 'বিকল্প ফোন নম্বর',
    'register.step2.add_phone': '+ অতিরিক্ত ফোন যোগ করুন',
    'register.step2.save_continue': 'সংরক্ষণ করুন এবং চালিয়ে যান',
    
    // Step 3 - Address
    'register.step3.title': 'বর্তমান এবং স্থায়ী ঠিকানা',
    'register.step3.present_address': 'বর্তমান ঠিকানা',
    'register.step3.permanent_address': 'স্থায়ী ঠিকানা',
    'register.step3.nationality': 'জাতীয়তা নির্বাচন করুন',
    'register.step3.division': 'বিভাগ নির্বাচন করুন',
    'register.step3.district': 'জেলা নির্বাচন করুন',
    'register.step3.subdistrict': 'উপজেলা/থানা',
    'register.step3.village_house': 'গ্রাম/বাড়ি এবং রাস্তা',
    'register.step3.zip_code': 'জিপ কোড',
    'register.step3.same_address': 'বর্তমান ঠিকানার মতো',
    'register.step3.permanent_note': 'আপনার স্থায়ী ঠিকানা লিখুন!',
    
    // Step 4 - Professional
    'register.step4.title': 'পেশাগত তথ্য',
    'register.step4.occupation': 'পেশা',
    'register.step4.business_type': 'ব্যবসার ধরন',
    'register.step4.business_subcategory': 'ব্যবসার উপবিভাগ',
    'register.step4.business_name': 'ব্যবসার নাম',
    'register.step4.designation': 'পদবী',
    'register.step4.workplace_address': 'কর্মক্ষেত্রের ঠিকানা',
    'register.step4.special_note': 'বিশেষ নোট',
    'register.step4.start_date': 'শুরুর তারিখ',
    'register.step4.end_date': 'শেষের তারিখ',
    'register.step4.currently_working': 'বর্তমানে কাজ করছেন',
    'register.step4.job_description': 'কাজের বিবরণ',
    'register.step4.complete_registration': 'নিবন্ধন সম্পূর্ণ করুন',
    
    // OTP Verification
    'register.otp.title': 'আপনার ফোন নম্বর যাচাই করুন',
    'register.otp.subtitle': 'আপনার মোবাইল এসএমএস চেক করুন এবং নিচের বক্সে ওটিপি সঠিকভাবে লিখুন!',
    'register.otp.not_received': 'ওটিপি পাননি?',
    'register.otp.resend': 'আবার ওটিপি পাঠান',
    'register.otp.autofill': 'ডেমো ওটিপি অটো-ফিল',
    'register.otp.demo.title': 'পরীক্ষার জন্য ডেমো ওটিপি:',
    'register.otp.error.incomplete': 'সম্পূর্ণ ৬ সংখ্যার ওটিপি লিখুন',
    'register.otp.error.invalid': 'ভুল ওটিপি। আবার চেষ্টা করুন।',
    
    // Phone validation
    'registration.phone.error.bangladesh': 'বাংলাদেশের নম্বর অবশ্যই ০১ দিয়ে শুরু হতে হবে',
    'registration.phone.error.length': 'ফোন নম্বর অবশ্যই ১১ সংখ্যার হতে হবে',
    'registration.phone.error.numbers': 'শুধুমাত্র সংখ্যা অনুমোদিত',
    
    // Password validation
    'registration.password.error.length': 'কমপক্ষে ৮টি অক্ষর',
    'registration.password.error.uppercase': 'একটি বড় হাতের অক্ষর',
    'registration.password.error.lowercase': 'একটি ছোট হাতের অক্ষর',
    'registration.password.error.number': 'একটি সংখ্যা',
    'registration.password.error.special': 'একটি বিশেষ চিহ্ন',
    'registration.password.error.match': 'পাসওয়ার্ড মিলছে না',
    
    // Dropdowns
    'dropdown.select': 'নির্বাচন করুন...',
    'dropdown.search': 'অনুসন্ধান...',
    
    // Gender options
    'gender.male': 'পুরুষ',
    'gender.female': 'মহিলা',
    'gender.other': 'অন্যান্য',
    
    // Religion options
    'religion.islam': 'ইসলাম',
    'religion.hinduism': 'হিন্দু ধর্ম',
    'religion.christianity': 'খ্রিস্ট ধর্ম',
    'religion.buddhism': 'বৌদ্ধ ধর্ম',
    'religion.other': 'অন্যান্য',
    
    // Marital status
    'marital.single': 'অবিবাহিত',
    'marital.married': 'বিবাহিত',
    'marital.divorced': 'তালাকপ্রাপ্ত',
    'marital.widowed': 'বিধবা/বিপত্নীক',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'bn' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
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
