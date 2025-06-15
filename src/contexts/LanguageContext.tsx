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
    
    // Hero Section
    'hero.welcome': 'Welcome to',
    'hero.community': 'Professional Network',
    'hero.description': 'Connect with professionals, grow your network, and discover new opportunities in our thriving community.',
    'hero.join': 'Join Community',
    'hero.learn': 'Learn More',
    'hero.members': 'Active Members',
    'hero.connections': 'Daily Connections',
    'hero.satisfaction': 'Satisfaction Rate',
    'hero.overview': 'Platform Overview',
    'hero.discover': 'Discover what makes us different',
    
    // Features Section
    'features.title': 'Why Choose Our Platform',
    'features.subtitle': 'Discover the features that make our community special and help you grow professionally',
    'features.privacy.title': 'Privacy First',
    'features.privacy.desc': 'Your data is secure with end-to-end encryption and privacy controls',
    'features.network.title': 'Strong Network',
    'features.network.desc': 'Connect with like-minded professionals and expand your network',
    'features.communication.title': 'Easy Communication',
    'features.communication.desc': 'Chat, share ideas, and collaborate with community members',
    'features.customizable.title': 'Customizable Profile',
    'features.customizable.desc': 'Create a professional profile that showcases your skills',
    'features.global.title': 'Global Reach',
    'features.global.desc': 'Connect with professionals from around the world',
    'features.invite.title': 'Invite Only',
    'features.invite.desc': 'Join our exclusive community through member invitations',

    // About Section
    'about.title': 'About Our Community',
    'about.description1': 'We are a thriving professional community dedicated to connecting talented individuals from diverse backgrounds and industries.',
    'about.description2': 'Our platform provides a space for meaningful connections, knowledge sharing, and professional growth opportunities.',
    'about.mission': 'Our Mission',
    'about.mission.desc': 'To empower professionals through meaningful connections',
    'about.values': 'Our Values',
    'about.values.desc': 'Integrity, innovation, and inclusive growth',
    'about.innovation': 'Innovation',
    'about.innovation.desc': 'We continuously evolve our platform to meet the changing needs of modern professionals.',
    'about.growth': 'Growth',
    'about.growth.desc': 'Every member contributes to our collective success and professional development.',
    'about.journey': 'Start Your Journey',
    'about.journey.desc': 'Join thousands of professionals who have already transformed their careers with us.',
    'about.getstarted': 'Get Started',

    // Members Section
    'members.title': 'Meet Our Community',
    'members.subtitle': 'Connect with professionals who are making a difference in their industries',
    'members.specialty': 'Specialty',
    'members.connect': 'Connect',
    'members.viewall': 'View All Members',

    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    'contact.getintouch': 'Get in Touch',
    'contact.address': 'Address',
    'contact.address.full': '123 Community Street\nDhaka, Bangladesh 1000',
    'contact.phone': 'Phone',
    'contact.phone.mobile': '+880 1234-567890',
    'contact.phone.office': '+880 9876-543210',
    'contact.email': 'Email',
    'contact.email.info': 'info@onnorokom.com',
    'contact.email.support': 'support@onnorokom.com',
    'contact.hours': 'Office Hours',
    'contact.hours.weekday': 'Monday - Friday: 9:00 AM - 6:00 PM',
    'contact.hours.saturday': 'Saturday: 10:00 AM - 4:00 PM',
    'contact.hours.sunday': 'Sunday: Closed',
    'contact.sendmessage': 'Send us a Message',
    'contact.firstname': 'First Name',
    'contact.firstname.placeholder': 'Enter your first name',
    'contact.lastname': 'Last Name',
    'contact.lastname.placeholder': 'Enter your last name',
    'contact.email.label': 'Email Address',
    'contact.email.placeholder': 'Enter your email address',
    'contact.message': 'Message',
    'contact.message.placeholder': 'Write your message here...',
    'contact.send': 'Send Message',
    'contact.findus': 'Find Us',
    'contact.interactivemap': 'Interactive Map Coming Soon',
    'contact.location': 'Dhaka, Bangladesh',

    // Footer
    'footer.tagline': 'Building connections, fostering growth, creating opportunities.',
    'footer.quicklinks': 'Quick Links',
    'footer.about': 'About',
    'footer.contact.page': 'Contact',
    'footer.admin': 'Admin',
    'footer.admin.panel': 'Admin Panel',
    'footer.admin.login': 'Admin Login',
    'footer.admin.properties': 'Properties',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
    'footer.developed': '© 2024 Developed by',
    'footer.company': 'OnnoRokom Community',
    
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
    'register.step2.nickname_placeholder': 'The name your family and friends call you by.',
    'register.step2.add_nickname': '+ Add Nickname',
    'register.step2.date_of_birth': 'Date of Birth',
    'register.step2.date_of_birth_placeholder': 'Select your date of birth',
    'register.step2.gender': 'Gender',
    'register.step2.gender_placeholder': 'Select Gender',
    'register.step2.gender.male': 'Male',
    'register.step2.gender.female': 'Female',
    'register.step2.gender.other': 'Other',
    'register.step2.religion': 'Religion',
    'register.step2.religion_placeholder': 'Select Religion',
    'register.step2.religion.islam': 'Islam',
    'register.step2.religion.hinduism': 'Hinduism',
    'register.step2.religion.christianity': 'Christianity',
    'register.step2.religion.buddhism': 'Buddhism',
    'register.step2.religion.other': 'Other',
    'register.step2.marital_status': 'Marital Status',
    'register.step2.marital_placeholder': 'Select Marital Status',
    'register.step2.marital.single': 'Single',
    'register.step2.marital.married': 'Married',
    'register.step2.marital.divorced': 'Divorced',
    'register.step2.marital.widowed': 'Widowed',
    'register.step2.personal_email': 'Personal Email',
    'register.step2.personal_email_placeholder': 'your.email@example.com',
    'register.step2.additional_phone': 'Additional Phone Number',
    'register.step2.additional_phone_placeholder': 'Alternative phone number',
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
    'register.step4.workplace_address': 'Workplace Address',
    'register.step4.special_note': 'Special Note',
    'register.step4.start_date': 'Start Date',
    'register.step4.end_date': 'End Date',
    'register.step4.currently_working': 'Currently Working',
    'register.step4.job_description': 'Job Description',
    'register.step4.complete_registration': 'Complete Registration',
    // REMOVE: All keys beginning with register.step4.business, and register.step4.designation
    
    // Step 4 Errors
    'register.step4.errors.occupation.required': 'Please select an occupation',
    
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
    
    // Hero Section
    'hero.welcome': 'স্বাগতম',
    'hero.community': 'পেশাদার নেটওয়ার্কে',
    'hero.description': 'পেশাদারদের সাথে সংযোগ করুন, আপনার নেটওয়ার্ক বাড়ান এবং আমাদের সমৃদ্ধ কমিউনিটিতে নতুন সুযোগ আবিষ্কার করুন।',
    'hero.join': 'কমিউনিটিতে যোগ দিন',
    'hero.learn': 'আরো জানুন',
    'hero.members': 'সক্রিয় সদস্য',
    'hero.connections': 'দৈনিক সংযোগ',
    'hero.satisfaction': 'সন্তুষ্টির হার',
    'hero.overview': 'প্ল্যাটফর্ম ওভারভিউ',
    'hero.discover': 'আমাদের বিশেষত্ব আবিষ্কার করুন',

    // Features Section
    'features.title': 'কেন আমাদের প্ল্যাটফর্ম বেছে নিবেন',
    'features.subtitle': 'আমাদের কমিউনিটির বিশেষ বৈশিষ্ট্যগুলি আবিষ্কার করুন যা আপনাকে পেশাগতভাবে বৃদ্ধি পেতে সাহায্য করে',
    'features.privacy.title': 'প্রাইভেসি প্রথম',
    'features.privacy.desc': 'এন্ড-টু-এন্ড এনক্রিপশন এবং প্রাইভেসি নিয়ন্ত্রণের সাথে আপনার ডেটা নিরাপদ',
    'features.network.title': 'শক্তিশালী নেটওয়ার্ক',
    'features.network.desc': 'সমমনা পেশাদারদের সাথে সংযোগ করুন এবং আপনার নেটওয়ার্ক বিস্তৃত করুন',
    'features.communication.title': 'সহজ যোগাযোগ',
    'features.communication.desc': 'চ্যাট করুন, ধারণা শেয়ার করুন এবং কমিউনিটি সদস্যদের সাথে সহযোগিতা করুন',
    'features.customizable.title': 'কাস্টমাইজেবল প্রোফাইল',
    'features.customizable.desc': 'একটি পেশাদার প্রোফাইল তৈরি করুন যা আপনার দক্ষতা প্রদর্শন করে',
    'features.global.title': 'বৈশ্বিক পৌঁছানো',
    'features.global.desc': 'বিশ্বব্যাপী পেশাদারদের সাথে সংযোগ করুন',
    'features.invite.title': 'আমন্ত্রণ-ভিত্তিক',
    'features.invite.desc': 'সদস্যদের আমন্ত্রণের মাধ্যমে আমাদের একচেটিয়া কমিউনিটিতে যোগ দিন',

    // About Section
    'about.title': 'আমাদের কমিউনিটি সম্পর্কে',
    'about.description1': 'আমরা একটি সমৃদ্ধ পেশাদার কমিউনিটি যা বিভিন্ন পটভূমি এবং শিল্প থেকে প্রতিভাবান ব্যক্তিদের সংযোগ করতে নিবেদিত।',
    'about.description2': 'আমাদের প্ল্যাটফর্ম অর্থপূর্ণ সংযোগ, জ্ঞান ভাগাভাগি এবং পেশাগত বৃদ্ধির সুযোগের জন্য একটি স্থান প্রদান করে।',
    'about.mission': 'আমাদের লক্ষ্য',
    'about.mission.desc': 'অর্থপূর্ণ সংযোগের মাধ্যমে পেশাদারদের ক্ষমতায়ন করা',
    'about.values': 'আমাদের মূল্যবোধ',
    'about.values.desc': 'সততা, উদ্ভাবন এবং অন্তর্ভুক্তিমূলক বৃদ্ধি',
    'about.innovation': 'উদ্ভাবন',
    'about.innovation.desc': 'আধুনিক পেশাদারদের পরিবর্তনশীল চাহিদা মেটাতে আমরা ক্রমাগত আমাদের প্ল্যাটফর্ম উন্নত করি।',
    'about.growth': 'বৃদ্ধি',
    'about.growth.desc': 'প্রতিটি সদস্য আমাদের সামষ্টিক সাফল্য এবং পেশাগত উন্নয়নে অবদান রাখে।',
    'about.journey': 'আপনার যাত্রা শুরু করুন',
    'about.journey.desc': 'হাজার হাজার পেশাদারের সাথে যোগ দিন যারা আমাদের সাথে তাদের ক্যারিয়ার রূপান্তরিত করেছেন।',
    'about.getstarted': 'শুরু করুন',

    // Members Section
    'members.title': 'আমাদের কমিউনিটির সাথে পরিচিত হন',
    'members.subtitle': 'এমন পেশাদারদের সাথে সংযোগ করুন যারা তাদের শিল্পে পরিবর্তন আনছেন',
    'members.specialty': 'বিশেষত্ব',
    'members.connect': 'সংযোগ করুন',
    'members.viewall': 'সব সদস্য দেখুন',

    // Contact Section
    'contact.title': 'যোগাযোগ করুন',
    'contact.subtitle': 'প্রশ্ন আছে? আমরা আপনার কাছ থেকে শুনতে পছন্দ করব। আমাদের একটি বার্তা পাঠান এবং আমরা যত তাড়াতাড়ি সম্ভব উত্তর দেব।',
    'contact.getintouch': 'যোগাযোগ করুন',
    'contact.address': 'ঠিকানা',
    'contact.address.full': '১২৩ কমিউনিটি স্ট্রিট\nঢাকা, বাংলাদেশ ১০০০',
    'contact.phone': 'ফোন',
    'contact.phone.mobile': '+৮৮০ ১২৩৪-৫৬৭৮৯০',
    'contact.phone.office': '+৮৮০ ৯৮৭৬-৫৪৩২১০',
    'contact.email': 'ইমেইল',
    'contact.email.info': 'info@onnorokom.com',
    'contact.email.support': 'support@onnorokom.com',
    'contact.hours': 'অফিস সময়',
    'contact.hours.weekday': 'সোমবার - শুক্রবার: সকাল ৯:০০ - সন্ধ্যা ৬:০০',
    'contact.hours.saturday': 'শনিবার: সকাল ১০:০০ - বিকাল ৪:০০',
    'contact.hours.sunday': 'রবিবার: বন্ধ',
    'contact.sendmessage': 'আমাদের একটি বার্তা পাঠান',
    'contact.firstname': 'প্রথম নাম',
    'contact.firstname.placeholder': 'আপনার প্রথম নাম লিখুন',
    'contact.lastname': 'শেষ নাম',
    'contact.lastname.placeholder': 'আপনার শেষ নাম লিখুন',
    'contact.email.label': 'ইমেইল ঠিকানা',
    'contact.email.placeholder': 'আপনার ইমেইল ঠিকানা লিখুন',
    'contact.message': 'বার্তা',
    'contact.message.placeholder': 'এখানে আপনার বার্তা লিখুন...',
    'contact.send': 'বার্তা পাঠান',
    'contact.findus': 'আমাদের খুঁজুন',
    'contact.interactivemap': 'ইন্টারঅ্যাক্টিভ ম্যাপ শীঘ্রই আসছে',
    'contact.location': 'ঢাকা, বাংলাদেশ',

    // Footer
    'footer.tagline': 'সংযোগ গড়ে তোলা, বৃদ্ধি বৃদ্ধি করা, সুযোগ সৃষ্টি করা।',
    'footer.quicklinks': 'দ্রুত লিঙ্ক',
    'footer.about': 'সম্পর্কে',
    'footer.contact.page': 'যোগাযোগ',
    'footer.admin': 'অ্যাডমিন',
    'footer.admin.panel': 'অ্যাডমিন প্যানেল',
    'footer.admin.login': 'অ্যাডমিন লগইন',
    'footer.admin.properties': 'বৈশিষ্ট্যাবলী',
    'footer.privacy': 'গোপনীয়তা নীতি',
    'footer.terms': 'সেবার শর্তাবলী',
    'footer.contact': 'আমাদের সাথে যোগাযোগ করুন',
    'footer.developed': '© ২০২৪ তৈরি করেছে',
    'footer.company': 'অন্নরকম কমিউনিটি',
    
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
    'register.step2.nickname_placeholder': 'আপনার পরিবার ও বন্ধুরা যে নামে আপনাকে ডাকে',
    'register.step2.add_nickname': '+ ডাকনাম যোগ করুন',
    'register.step2.date_of_birth': 'জন্ম তারিখ',
    'register.step2.date_of_birth_placeholder': 'আপনার জন্ম তারিখ নির্বাচন করুন',
    'register.step2.gender': 'লিঙ্গ',
    'register.step2.gender_placeholder': 'লিঙ্গ নির্বাচন করুন',
    'register.step2.gender.male': 'পুরুষ',
    'register.step2.gender.female': 'মহিলা',
    'register.step2.gender.other': 'অন্যান্য',
    'register.step2.religion': 'ধর্ম',
    'register.step2.religion_placeholder': 'ধর্ম নির্বাচন করুন',
    'register.step2.religion.islam': 'ইসলাম',
    'register.step2.religion.hinduism': 'হিন্দু ধর্ম',
    'register.step2.religion.christianity': 'খ্রিস্ট ধর্ম',
    'register.step2.religion.buddhism': 'বৌদ্ধ ধর্ম',
    'register.step2.religion.other': 'অন্যান্য',
    'register.step2.marital_status': 'বৈবাহিক অবস্থা',
    'register.step2.marital_placeholder': 'বৈবাহিক অবস্থা নির্বাচন করুন',
    'register.step2.marital.single': 'অবিবাহিত',
    'register.step2.marital.married': 'বিবাহিত',
    'register.step2.marital.divorced': 'তালাকপ্রাপ্ত',
    'register.step2.marital.widowed': 'বিধবা/বিপত্নীক',
    'register.step2.personal_email': 'ব্যক্তিগত ইমেইল',
    'register.step2.personal_email_placeholder': 'your.email@example.com',
    'register.step2.additional_phone': 'অতিরিক্ত ফোন নম্বর',
    'register.step2.additional_phone_placeholder': 'বিকল্প ফোন নম্বর',
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
    'register.step4.workplace_address': 'কর্মক্ষেত্রের ঠিকানা',
    'register.step4.special_note': 'বিশেষ নোট',
    'register.step4.start_date': 'শুরুর তারিখ',
    'register.step4.end_date': 'শেষের তারিখ',
    'register.step4.currently_working': 'বর্তমানে কাজ করছেন',
    'register.step4.job_description': 'কাজের বিবরণ',
    'register.step4.complete_registration': 'নিবন্ধন সম্পূর্ণ করুন',
    // REMOVE: All keys beginning with register.step4.business, and register.step4.designation
    
    // Step 4 Errors
    'register.step4.errors.occupation.required': 'দয়া করে একটি পেশা নির্বাচন করুন',
    
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
