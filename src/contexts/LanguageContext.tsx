import React, { createContext, useContext, useState, useCallback } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      hero: {
        welcome: 'Welcome to the',
        community: 'OnnoRokom Community',
        description: 'Connect, collaborate, and grow with a vibrant community of like-minded individuals. Join us to explore new opportunities and build meaningful connections.',
        join: 'Join Our Community',
        learn: 'Learn More',
        members: 'Members',
        connections: 'Connections Made',
        satisfaction: 'Customer Satisfaction',
        overview: 'Community Overview',
        discover: 'Discover the power of community',
      },
      features: {
        title: 'Our Community Features',
        subtitle: 'Explore the benefits of joining our community',
        mentorship: 'Mentorship Programs',
        collaboration: 'Collaborative Projects',
        networking: 'Networking Events',
        resources: 'Exclusive Resources',
        workshops: 'Skill-Enhancing Workshops',
        support: '24/7 Community Support',
        mentorship_description: 'Get guidance from experienced mentors in your field.',
        collaboration_description: 'Participate in exciting projects and initiatives with fellow members.',
        networking_description: 'Attend events to meet and connect with industry professionals.',
        resources_description: 'Access a library of tools and resources to help you succeed.',
        workshops_description: 'Improve your skills with our hands-on workshops and training sessions.',
        support_description: 'Get the support you need, whenever you need it.',
      },
      about: {
        title: 'About OnnoRokom Community',
        subtitle: 'Our mission is to empower individuals through collaboration and knowledge sharing.',
        description: 'We believe in the power of community to drive innovation and personal growth. Our platform is designed to foster connections, provide resources, and create opportunities for members to thrive.',
        values: 'Our Core Values',
        value1: 'Collaboration',
        value2: 'Innovation',
        value3: 'Empowerment',
        value4: 'Growth',
        value1_description: 'We believe in the power of working together to achieve common goals.',
        value2_description: 'We encourage creative thinking and the development of new ideas.',
        value3_description: 'We provide the tools and resources to help our members succeed.',
        value4_description: 'We are committed to helping our members grow both personally and professionally.',
      },
      members: {
        title: 'Meet Our Members',
        subtitle: 'Connect with talented individuals from diverse backgrounds',
        view_all: 'View All Members',
      },
      contact: {
        title: 'Contact Us',
        subtitle: 'Get in touch with our team for inquiries and support',
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        send: 'Send Message',
        address: 'Address',
        phone: 'Phone',
        email_address: 'Email',
      },
      footer: {
        copyright: 'Copyright © 2024 OnnoRokom Community. All rights reserved.',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
      },
      common: {
        back: 'Back'
      },
      login: {
        title: 'Login to Your Account',
        subtitle: 'Enter your credentials to access your account',
        email: 'Email',
        password: 'Password',
        remember: 'Remember me',
        forgot: 'Forgot Password?',
        button: 'Login',
        no_account: 'Don\'t have an account?',
        register: 'Register here'
      },
      register: {
        title: 'Create Your OnnoRokom Account',
        subtitle: 'Join our community and connect with people',
        verify: 'Verify',
        step1: {
          title: 'Phone & Password',
          phone: 'Phone Number',
          phone_placeholder: 'Enter your 11-digit phone number',
          country_code: 'Country Code',
          password: 'New Password',
          password_placeholder: 'Enter a strong password',
          confirm_password: 'Confirm Password',
          confirm_placeholder: 'Re-enter your password',
          send_otp: 'Send OTP',
          password_requirements: 'Password must be at least 8 characters with uppercase, lowercase, number and special character',
          phone_confirmation: 'Are you sure this is your phone number?',
          edit_phone: 'Edit',
          confirm_phone: 'Confirm',
          errors: {
            phone: {
              required: 'Phone number is required',
              invalid: 'Please enter a valid phone number',
              bangladesh: 'For Bangladesh, phone number must start with 01'
            },
            password: {
              required: 'Password is required',
              weak: 'Password is too weak',
              mismatch: 'Passwords do not match'
            }
          }
        },
        step2: {
          title: 'Personal Information',
          subtitle: 'Tell us about yourself',
          fullname: 'Full Name',
          fullname_placeholder: 'Enter your full name as per certificate',
          nickname: 'Nickname',
          nickname_placeholder: 'Enter your nickname',
          nickname_add: 'Add Nickname',
          dob: 'Date of Birth',
          gender: 'Gender',
          gender_placeholder: 'Select gender',
          gender: {
            male: 'Male',
            female: 'Female',
            other: 'Other'
          },
          religion: 'Religion',
          religion_placeholder: 'Select religion',
          religion: {
            islam: 'Islam',
            hinduism: 'Hinduism',
            christianity: 'Christianity',
            buddhism: 'Buddhism',
            other: 'Other'
          },
          marital: 'Marital Status',
          marital_placeholder: 'Select marital status',
          marital: {
            single: 'Single',
            married: 'Married',
            divorced: 'Divorced',
            widowed: 'Widowed'
          },
          email: {
            personal: 'Personal Email',
            personal_placeholder: 'Enter your personal email',
            official: 'Official Email',
            official_placeholder: 'Enter your official email'
          },
          phone: {
            additional: 'Additional Phone Number',
            additional_placeholder: 'Enter additional phone number',
            additional_add: 'Add Additional Phone Number'
          },
          continue: 'Save and Continue',
          errors: {
            fullname: {
              required: 'Full name is required'
            },
            email: {
              invalid: 'Please enter a valid email address'
            }
          }
        },
        step3: {
          title: 'Address Information',
          subtitle: 'Enter your current and permanent address',
          present: {
            title: 'Present Address'
          },
          permanent: {
            title: 'Permanent Address'
          },
          nationality: 'Nationality',
          nationality_placeholder: 'Select nationality',
          nationality_other: 'Other',
          division: 'Division',
          division_placeholder: 'Select division',
          district: 'District',
          district_placeholder: 'Select district',
          subdistrict: 'Sub-district/Police Station',
          subdistrict_placeholder: 'Enter sub-district or police station',
          village: 'Village/House and Road',
          village_placeholder: 'Enter village, house and road',
          zipcode: 'Zip Code',
          zipcode_placeholder: 'Enter zip code',
          same_address: 'Same as Present Address',
          continue: 'Save and Continue',
          errors: {
            division: {
              required: 'Division is required'
            },
            district: {
              required: 'District is required'
            },
            subdistrict: {
              required: 'Sub-district is required'
            }
          }
        },
        step4: {
          title: 'Professional Information',
          subtitle: 'Tell us about your work and professional background',
          occupation: 'Occupation',
          occupation_placeholder: 'Select your occupation',
          occupation: {
            business_commerce: 'Business & Commerce',
            government_jobs: 'Government and Semi-government Jobs',
            education_research: 'Education & Research',
            healthcare: 'Healthcare',
            law_justice: 'Law & Justice',
            engineering_it: 'Engineering & IT',
            media_creative: 'Media & Creative',
            private_service: 'Private Service',
            self_employed: 'Self-employed/Freelancer',
            agriculture_fisheries: 'Agriculture & Fisheries',
            laborer_worker: 'Laborer/Worker',
            student: 'Student',
            homemaker: 'Homemaker',
            others: 'Others'
          },
          business: {
            type: 'Business Type/Sector',
            type_placeholder: 'Select business type',
            manufacturing: 'Manufacturing',
            trading: 'Trading/Sales',
            service: 'Service Based',
            agro: 'Agro-Business',
            other: 'Other Business',
            subcategory: 'Business Sub-category',
            subcategory_placeholder: 'Select sub-category',
            name: 'Business Name',
            name_placeholder: 'Enter business name',
            garments_rmg: 'Garments/RMG',
            food_beverage: 'Food & Beverage',
            pharmaceuticals: 'Pharmaceuticals',
            chemicals: 'Chemicals',
            electronics: 'Electronics',
            other_production: 'Other Production',
            wholesale: 'Wholesale',
            retail: 'Retail',
            import_export: 'Import-Export',
            ecommerce: 'E-commerce',
            other_trade: 'Other Trade'
          },
          designation: 'Designation/Role',
          designation_placeholder: 'Select your role',
          designation: {
            entrepreneur: 'Entrepreneur/Owner',
            senior: 'Senior Management',
            mid: 'Mid-level Management',
            officer: 'Officer/Executive',
            general: 'General Staff/Worker'
          },
          workplace: {
            address: 'Workplace Address'
          },
          start_date: 'Start Date',
          end_date: 'End Date',
          currently_working: 'I am currently working in this role',
          special_note: 'Special Note',
          special_note_placeholder: 'Enter special notes about your workplace',
          job_description: 'Job Description',
          job_description_placeholder: 'Describe your job responsibilities',
          complete: 'Save and Continue',
          errors: {
            occupation: {
              required: 'Occupation is required'
            }
          }
        },
        otp: {
          title: 'OTP Verification',
          subtitle: 'Check your mobile SMS and enter the OTP accurately in the box below!',
          not_received: 'Did not receive the OTP?',
          resend: 'Send OTP again',
          autofill: 'OTP auto refill',
          demo: {
            title: 'Demo OTPs for testing:'
          },
          error: {
            incomplete: 'Please enter the complete 6-digit OTP',
            invalid: 'Invalid OTP. Please try again.'
          }
        }
      }
    },
    bn: {
      hero: {
        welcome: 'তে স্বাগতম',
        community: 'অন্যরকম কমিউনিটি',
        description: 'সমমনা ব্যক্তিদের একটি প্রাণবন্ত সম্প্রদায়ের সাথে সংযোগ স্থাপন করুন, সহযোগিতা করুন এবং বৃদ্ধি করুন। নতুন সুযোগগুলি অন্বেষণ করতে এবং অর্থবহ সংযোগ তৈরি করতে আমাদের সাথে যোগ দিন।',
        join: 'আমাদের কমিউনিটিতে যোগদান করুন',
        learn: 'আরও জানুন',
        members: 'সদস্য',
        connections: 'সংযোগ তৈরি হয়েছে',
        satisfaction: 'গ্রাহক সন্তুষ্টি',
        overview: 'কমিউনিটি ওভারভিউ',
        discover: 'কমিউনিটির শক্তি আবিষ্কার করুন',
      },
      features: {
        title: 'আমাদের কমিউনিটির বৈশিষ্ট্য',
        subtitle: 'আমাদের কমিউনিটিতে যোগদানের সুবিধাগুলি অন্বেষণ করুন',
        mentorship: 'মেন্টরশিপ প্রোগ্রাম',
        collaboration: 'সহযোগিতামূলক প্রকল্প',
        networking: 'নেটওয়ার্কিং ইভেন্ট',
        resources: 'এক্সক্লুসিভ রিসোর্স',
        workshops: 'দক্ষতা বৃদ্ধি কর্মশালা',
        support: '24/7 কমিউনিটি সাপোর্ট',
        mentorship_description: 'আপনার ক্ষেত্রে অভিজ্ঞ মেন্টরদের কাছ থেকে নির্দেশনা পান।',
        collaboration_description: 'সহকর্মী সদস্যদের সাথে উত্তেজনাপূর্ণ প্রকল্প এবং উদ্যোগে অংশ নিন।',
        networking_description: 'শিল্প পেশাদারদের সাথে দেখা করতে এবং সংযোগ স্থাপন করতে ইভেন্টে যোগ দিন।',
        resources_description: 'আপনাকে সফল হতে সাহায্য করার জন্য সরঞ্জাম এবং সংস্থানগুলির একটি লাইব্রেরি অ্যাক্সেস করুন।',
        workshops_description: 'আমাদের হাতে-কলমে কর্মশালা এবং প্রশিক্ষণ সেশনের মাধ্যমে আপনার দক্ষতা উন্নত করুন।',
        support_description: 'আপনার যখন প্রয়োজন, তখনই সহায়তা পান।',
      },
      about: {
        title: 'অন্যরকম কমিউনিটি সম্পর্কে',
        subtitle: 'আমাদের লক্ষ্য সহযোগিতা এবং জ্ঞান ভাগাভাগির মাধ্যমে ব্যক্তিদের ক্ষমতায়ন করা।',
        description: 'আমরা উদ্ভাবন এবং ব্যক্তিগত বিকাশের জন্য সম্প্রদায়ের শক্তিতে বিশ্বাস করি। আমাদের প্ল্যাটফর্মটি সংযোগ তৈরি করতে, সংস্থান সরবরাহ করতে এবং সদস্যদের উন্নতির সুযোগ তৈরি করার জন্য ডিজাইন করা হয়েছে।',
        values: 'আমাদের মূল মূল্যবোধ',
        value1: 'সহযোগিতা',
        value2: 'উদ্ভাবন',
        value3: 'ক্ষমতায়ন',
        value4: 'বৃদ্ধি',
        value1_description: 'আমরা সাধারণ লক্ষ্য অর্জনের জন্য একসাথে কাজ করার শক্তিতে বিশ্বাস করি।',
        value2_description: 'আমরা সৃজনশীল চিন্তাভাবনা এবং নতুন ধারণা বিকাশের জন্য উৎসাহিত করি।',
        value3_description: 'আমরা আমাদের সদস্যদের সফল হতে সাহায্য করার জন্য সরঞ্জাম এবং সংস্থান সরবরাহ করি।',
        value4_description: 'আমরা আমাদের সদস্যদের ব্যক্তিগত এবং পেশাগতভাবে উভয় ক্ষেত্রেই বৃদ্ধি পেতে সহায়তা করতে প্রতিশ্রুতিবদ্ধ।',
      },
      members: {
        title: 'আমাদের সদস্যদের সাথে পরিচিত হন',
        subtitle: 'বিভিন্ন পটভূমির প্রতিভাবান ব্যক্তিদের সাথে সংযোগ স্থাপন করুন',
        view_all: 'সকল সদস্য দেখুন',
      },
      contact: {
        title: 'যোগাযোগ করুন',
        subtitle: 'অনুসন্ধান এবং সহায়তার জন্য আমাদের দলের সাথে যোগাযোগ করুন',
        name: 'আপনার নাম',
        email: 'আপনার ইমেল',
        message: 'আপনার বার্তা',
        send: 'বার্তা পাঠান',
        address: 'ঠিকানা',
        phone: 'ফোন',
        email_address: 'ইমেল',
      },
      footer: {
        copyright: 'কপিরাইট © ২০২৪ অন্যরকম কমিউনিটি। সর্বস্বত্ব সংরক্ষিত।',
        terms: 'ব্যবহারের শর্তাবলী',
        privacy: 'গোপনীয়তা নীতি',
      },
      common: {
        back: 'ফিরে যান'
      },
      login: {
        title: 'আপনার অ্যাকাউন্টে লগইন করুন',
        subtitle: 'আপনার অ্যাকাউন্টে প্রবেশ করার জন্য আপনার প্রমাণপত্র লিখুন',
        email: 'ইমেইল',
        password: 'পাসওয়ার্ড',
        remember: 'আমাকে মনে রাখুন',
        forgot: 'পাসওয়ার্ড ভুলে গেছেন?',
        button: 'লগইন',
        no_account: 'অ্যাকাউন্ট নেই?',
        register: 'এখানে নিবন্ধন করুন'
      },
      register: {
        title: 'আপনার অন্যরকম অ্যাকাউন্ট তৈরি করুন',
        subtitle: 'আমাদের কমিউনিটিতে যোগ দিন এবং মানুষের সাথে সংযুক্ত হন',
        verify: 'যাচাই করুন',
        step1: {
          title: 'ফোন এবং পাসওয়ার্ড',
          phone: 'ফোন নম্বর',
          phone_placeholder: 'আপনার ১১ ডিজিটের ফোন নম্বর লিখুন',
          country_code: 'কান্ট্রি কোড',
          password: 'নতুন পাসওয়ার্ড',
          password_placeholder: 'একটি শক্তিশালী পাসওয়ার্ড লিখুন',
          confirm_password: 'পাসওয়ার্ড নিশ্চিত করুন',
          confirm_placeholder: 'আপনার পাসওয়ার্ড পুনরায় লিখুন',
          send_otp: 'OTP পাঠান',
          password_requirements: 'পাসওয়ার্ড কমপক্ষে ৮ টি অক্ষর হতে হবে যাতে বড় হাতের, ছোট হাতের, সংখ্যা এবং বিশেষ অক্ষর থাকবে',
          phone_confirmation: 'আপনি কি নিশ্চিত এটি আপনার ফোন নম্বর?',
          edit_phone: 'সম্পাদনা',
          confirm_phone: 'নিশ্চিত করুন',
          errors: {
            phone: {
              required: 'ফোন নম্বর প্রয়োজন',
              invalid: 'অনুগ্রহ করে একটি বৈধ ফোন নম্বর লিখুন',
              bangladesh: 'বাংলাদেশের জন্য, ফোন নম্বর ০১ দিয়ে শুরু হতে হবে'
            },
            password: {
              required: 'পাসওয়ার্ড প্রয়োজন',
              weak: 'পাসওয়ার্ড অত্যন্ত দুর্বল',
              mismatch: 'পাসওয়ার্ড মিলছে না'
            }
          }
        },
        step2: {
          title: 'ব্যক্তিগত তথ্য',
          subtitle: 'আপনার সম্পর্কে আমাদের বলুন',
          fullname: 'পূর্ণ নাম',
          fullname_placeholder: 'সার্টিফিকেট অনুযায়ী আপনার পূর্ণ নাম লিখুন',
          nickname: 'ডাকনাম',
          nickname_placeholder: 'আপনার ডাকনাম লিখুন',
          nickname_add: 'ডাকনাম যোগ করুন',
          dob: 'জন্ম তারিখ',
          gender: 'লিঙ্গ',
          gender_placeholder: 'লিঙ্গ নির্বাচন করুন',
          gender: {
            male: 'পুরুষ',
            female: 'মহিলা',
            other: 'অন্যান্য'
          },
          religion: 'ধর্ম',
          religion_placeholder: 'ধর্ম নির্বাচন করুন',
          religion: {
            islam: 'ইসলাম',
            hinduism: 'হিন্দুধর্ম',
            christianity: 'খ্রিস্টধর্ম',
            buddhism: 'বৌদ্ধধর্ম',
            other: 'অন্যান্য'
          },
          marital: 'বৈবাহিক অবস্থা',
          marital_placeholder: 'বৈবাহিক অবস্থা নির্বাচন করুন',
          marital: {
            single: 'অবিবাহিত',
            married: 'বিবাহিত',
            divorced: 'তালাকপ্রাপ্ত',
            widowed: 'বিধবা/বিপত্নীক'
          },
          email: {
            personal: 'ব্যক্তিগত ইমেইল',
            personal_placeholder: 'আপনার ব্যক্তিগত ইমেইল লিখুন',
            official: 'অফিসিয়াল ইমেইল',
            official_placeholder: 'আপনার অফিসিয়াল ইমেইল লিখুন'
          },
          phone: {
            additional: 'অতিরিক্ত ফোন নম্বর',
            additional_placeholder: 'অতিরিক্ত ফোন নম্বর লিখুন',
            additional_add: 'অতিরিক্ত ফোন নম্বর যোগ করুন'
          },
          continue: 'সেভ করুন এবং চালিয়ে যান',
          errors: {
            fullname: {
              required: 'পূর্ণ নাম প্রয়োজন'
            },
            email: {
              invalid: 'অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা লিখুন'
            }
          }
        },
        step3: {
          title: 'ঠিকানার তথ্য',
          subtitle: 'আপনার বর্তমান এবং স্থায়ী ঠিকানা লিখুন',
          present: {
            title: 'বর্তমান ঠিকানা'
          },
          permanent: {
            title: 'স্থায়ী ঠিকানা'
          },
          nationality: 'জাতীয়তা',
          nationality_placeholder: 'জাতীয়তা নির্বাচন করুন',
          nationality_other: 'অন্যান্য',
          division: 'বিভাগ',
          division_placeholder: 'বিভাগ নির্বাচন করুন',
          district: 'জেলা',
          district_placeholder: 'জেলা নির্বাচন করুন',
          subdistrict: 'উপজেলা/থানা',
          subdistrict_placeholder: 'উপজেলা বা থানা লিখুন',
          village: 'গ্রাম/বাড়ি এবং রাস্তা',
          village_placeholder: 'গ্রাম, বাড়ি এবং রাস্তা লিখুন',
          zipcode: 'জিপ কোড',
          zipcode_placeholder: 'জিপ কোড লিখুন',
          same_address: 'বর্তমান ঠিকানার মতো',
          continue: 'সেভ করুন এবং চালিয়ে যান',
          errors: {
            division: {
              required: 'বিভাগ প্রয়োজন'
            },
            district: {
              required: 'জেলা প্রয়োজন'
            },
            subdistrict: {
              required: 'উপজেলা প্রয়োজন'
            }
          }
        },
        step4: {
          title: 'পেশাগত তথ্য',
          subtitle: 'আপনার কাজ এবং পেশাগত পটভূমি সম্পর্কে বলুন',
          occupation: 'পেশা',
          occupation_placeholder: 'আপনার পেশা নির্বাচন করুন',
          occupation: {
            business_commerce: 'ব্যবসা ও বাণিজ্য',
            government_jobs: 'সরকারি ও আধা-সরকারি চাকরি',
            education_research: 'শিক্ষা ও গবেষণা',
            healthcare: 'স্বাস্থ্যসেবা',
            law_justice: 'আইন ও বিচার',
            engineering_it: 'প্রকৌশল ও আইটি',
            media_creative: 'মিডিয়া ও সৃজনশীল',
            private_service: 'বেসরকারি সেবা',
            self_employed: 'স্ব-নিয়োজিত/ফ্রিল্যান্সার',
            agriculture_fisheries: 'কৃষি ও মৎস্য',
            laborer_worker: 'শ্রমিক/কর্মী',
            student: 'ছাত্র/ছাত্রী',
            homemaker: 'গৃহিণী',
            others: 'অন্যান্য'
          },
          business: {
            type: 'ব্যবসার ধরন/সেক্টর',
            type_placeholder: 'ব্যবসার ধরন নির্বাচন করুন',
            manufacturing: 'উৎপাদন',
            trading: 'ব্যবসা/বিক্রয়',
            service: 'সেবা ভিত্তিক',
            agro: 'কৃষি-ব্যবসা',
            other: 'অন্যান্য ব্যবসা',
            subcategory: 'ব্যবসার উপ-শ্রেণী',
            subcategory_placeholder: 'উপ-শ্রেণী নির্বাচন করুন',
            name: 'ব্যবসার নাম',
            name_placeholder: 'ব্যবসার নাম লিখুন',
            garments_rmg: 'পোশাক/আরএমজি',
            food_beverage: 'খাদ্য ও পানীয়',
            pharmaceuticals: 'ফার্মাসিউটিক্যালস',
            chemicals: 'রাসায়নিক',
            electronics: 'ইলেকট্রনিক্স',
            other_production: 'অন্যান্য উৎপাদন',
            wholesale: 'পাইকারি',
            retail: 'খুচরা',
            import_export: 'আমদানি-রপ্তানি',
            ecommerce: 'ই-কমার্স',
            other_trade: 'অন্যান্য ব্যবসা'
          },
          designation: 'পদবি/ভূমিকা',
          designation_placeholder: 'আপনার ভূমিকা নির্বাচন করুন',
          designation: {
            entrepreneur: 'উদ্যোক্তা/মালিক',
            senior: 'সিনিয়র ম্যানেজমেন্ট',
            mid: 'মিড-লেভেল ম্যানেজমেন্ট',
            officer: 'অফিসার/এক্সিকিউটিভ',
            general: 'সাধারণ স্টাফ/কর্মী'
          },
          workplace: {
            address: 'কর্মক্ষেত্রের ঠিকানা'
          },
          start_date: 'শুরুর তারিখ',
          end_date: 'শেষের তারিখ',
          currently_working: 'আমি বর্তমানে এই ভূমিকায় কাজ করছি',
          special_note: 'বিশেষ নোট',
          special_note_placeholder: 'আপনার কর্মক্ষেত্র সম্পর্কে বিশেষ নোট লিখুন',
          job_description: 'কাজের বিবরণ',
          job_description_placeholder: 'আপনার কাজের দায়িত্ব বর্ণনা করুন',
          complete: 'সেভ করুন এবং চালিয়ে যান',
          errors: {
            occupation: {
              required: 'পেশা প্রয়োজন'
            }
          }
        },
        otp: {
          title: 'OTP যাচাইকরণ',
          subtitle: 'আপনার মোবাইল SMS চেক করুন এবং নিচের বক্সে OTP সঠিকভাবে লিখুন!',
          not_received: 'OTP পাননি?',
          resend: 'আবার OTP পাঠান',
          autofill: 'OTP অটো রিফিল',
          demo: {
            title: 'পরীক্ষার জন্য ডেমো OTP:'
          },
          error: {
            incomplete: 'অনুগ্রহ করে সম্পূর্ণ ৬ ডিজিটের OTP লিখুন',
            invalid: 'ভুল OTP। অনুগ্রহ করে আবার চেষ্টা করুন।'
          }
        }
      }
    }
  };

  const t = useCallback((key: string) => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
