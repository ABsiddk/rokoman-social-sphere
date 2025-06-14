
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Phone, Eye, EyeOff, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';
import OTPVerification from './OTPVerification';

interface PhonePasswordStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete: () => void;
}

const countryOptions = [
  { code: '+93', name: 'Afghanistan', flag: '🇦🇫' },
  { code: '+355', name: 'Albania', flag: '🇦🇱' },
  { code: '+213', name: 'Algeria', flag: '🇩🇿' },
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+374', name: 'Armenia', flag: '🇦🇲' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: '+994', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: '+88', name: 'Bangladesh (Alt)', flag: '🇧🇩' },
  { code: '+375', name: 'Belarus', flag: '🇧🇾' },
  { code: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: '+501', name: 'Belize', flag: '🇧🇿' },
  { code: '+229', name: 'Benin', flag: '🇧🇯' },
  { code: '+975', name: 'Bhutan', flag: '🇧🇹' },
  { code: '+591', name: 'Bolivia', flag: '🇧🇴' },
  { code: '+387', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: '+267', name: 'Botswana', flag: '🇧🇼' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+673', name: 'Brunei', flag: '🇧🇳' },
  { code: '+359', name: 'Bulgaria', flag: '🇧🇬' },
  { code: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: '+257', name: 'Burundi', flag: '🇧🇮' },
  { code: '+855', name: 'Cambodia', flag: '🇰🇭' },
  { code: '+237', name: 'Cameroon', flag: '🇨🇲' },
  { code: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: '+238', name: 'Cape Verde', flag: '🇨🇻' },
  { code: '+236', name: 'Central African Republic', flag: '🇨🇫' },
  { code: '+235', name: 'Chad', flag: '🇹🇩' },
  { code: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: '+269', name: 'Comoros', flag: '🇰🇲' },
  { code: '+242', name: 'Congo', flag: '🇨🇬' },
  { code: '+243', name: 'Congo (DRC)', flag: '🇨🇩' },
  { code: '+506', name: 'Costa Rica', flag: '🇨🇷' },
  { code: '+385', name: 'Croatia', flag: '🇭🇷' },
  { code: '+53', name: 'Cuba', flag: '🇨🇺' },
  { code: '+357', name: 'Cyprus', flag: '🇨🇾' },
  { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
  { code: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: '+253', name: 'Djibouti', flag: '🇩🇯' },
  { code: '+1', name: 'Dominican Republic', flag: '🇩🇴' },
  { code: '+593', name: 'Ecuador', flag: '🇪🇨' },
  { code: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: '+503', name: 'El Salvador', flag: '🇸🇻' },
  { code: '+240', name: 'Equatorial Guinea', flag: '🇬🇶' },
  { code: '+291', name: 'Eritrea', flag: '🇪🇷' },
  { code: '+372', name: 'Estonia', flag: '🇪🇪' },
  { code: '+251', name: 'Ethiopia', flag: '🇪🇹' },
  { code: '+679', name: 'Fiji', flag: '🇫🇯' },
  { code: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+241', name: 'Gabon', flag: '🇬🇦' },
  { code: '+220', name: 'Gambia', flag: '🇬🇲' },
  { code: '+995', name: 'Georgia', flag: '🇬🇪' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+233', name: 'Ghana', flag: '🇬🇭' },
  { code: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: '+299', name: 'Greenland', flag: '🇬🇱' },
  { code: '+1', name: 'Grenada', flag: '🇬🇩' },
  { code: '+502', name: 'Guatemala', flag: '🇬🇹' },
  { code: '+224', name: 'Guinea', flag: '🇬🇳' },
  { code: '+245', name: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: '+592', name: 'Guyana', flag: '🇬🇾' },
  { code: '+509', name: 'Haiti', flag: '🇭🇹' },
  { code: '+504', name: 'Honduras', flag: '🇭🇳' },
  { code: '+852', name: 'Hong Kong', flag: '🇭🇰' },
  { code: '+36', name: 'Hungary', flag: '🇭🇺' },
  { code: '+354', name: 'Iceland', flag: '🇮🇸' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: '+98', name: 'Iran', flag: '🇮🇷' },
  { code: '+964', name: 'Iraq', flag: '🇮🇶' },
  { code: '+353', name: 'Ireland', flag: '🇮🇪' },
  { code: '+972', name: 'Israel', flag: '🇮🇱' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+225', name: 'Ivory Coast', flag: '🇨🇮' },
  { code: '+1', name: 'Jamaica', flag: '🇯🇲' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: '+7', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: '+254', name: 'Kenya', flag: '🇰🇪' },
  { code: '+686', name: 'Kiribati', flag: '🇰🇮' },
  { code: '+850', name: 'North Korea', flag: '🇰🇵' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: '+996', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: '+856', name: 'Laos', flag: '🇱🇦' },
  { code: '+371', name: 'Latvia', flag: '🇱🇻' },
  { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
  { code: '+266', name: 'Lesotho', flag: '🇱🇸' },
  { code: '+231', name: 'Liberia', flag: '🇱🇷' },
  { code: '+218', name: 'Libya', flag: '🇱🇾' },
  { code: '+423', name: 'Liechtenstein', flag: '🇱🇮' },
  { code: '+370', name: 'Lithuania', flag: '🇱🇹' },
  { code: '+352', name: 'Luxembourg', flag: '🇱🇺' },
  { code: '+853', name: 'Macau', flag: '🇲🇴' },
  { code: '+389', name: 'North Macedonia', flag: '🇲🇰' },
  { code: '+261', name: 'Madagascar', flag: '🇲🇬' },
  { code: '+265', name: 'Malawi', flag: '🇲🇼' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+960', name: 'Maldives', flag: '🇲🇻' },
  { code: '+223', name: 'Mali', flag: '🇲🇱' },
  { code: '+356', name: 'Malta', flag: '🇲🇹' },
  { code: '+692', name: 'Marshall Islands', flag: '🇲🇭' },
  { code: '+222', name: 'Mauritania', flag: '🇲🇷' },
  { code: '+230', name: 'Mauritius', flag: '🇲🇺' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: '+691', name: 'Micronesia', flag: '🇫🇲' },
  { code: '+373', name: 'Moldova', flag: '🇲🇩' },
  { code: '+377', name: 'Monaco', flag: '🇲🇨' },
  { code: '+976', name: 'Mongolia', flag: '🇲🇳' },
  { code: '+382', name: 'Montenegro', flag: '🇲🇪' },
  { code: '+212', name: 'Morocco', flag: '🇲🇦' },
  { code: '+258', name: 'Mozambique', flag: '🇲🇿' },
  { code: '+95', name: 'Myanmar', flag: '🇲🇲' },
  { code: '+264', name: 'Namibia', flag: '🇳🇦' },
  { code: '+674', name: 'Nauru', flag: '🇳🇷' },
  { code: '+977', name: 'Nepal', flag: '🇳🇵' },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: '+505', name: 'Nicaragua', flag: '🇳🇮' },
  { code: '+227', name: 'Niger', flag: '🇳🇪' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
  { code: '+680', name: 'Palau', flag: '🇵🇼' },
  { code: '+970', name: 'Palestine', flag: '🇵🇸' },
  { code: '+507', name: 'Panama', flag: '🇵🇦' },
  { code: '+675', name: 'Papua New Guinea', flag: '🇵🇬' },
  { code: '+595', name: 'Paraguay', flag: '🇵🇾' },
  { code: '+51', name: 'Peru', flag: '🇵🇪' },
  { code: '+63', name: 'Philippines', flag: '🇵🇭' },
  { code: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: '+40', name: 'Romania', flag: '🇷🇴' },
  { code: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: '+250', name: 'Rwanda', flag: '🇷🇼' },
  { code: '+1', name: 'Saint Lucia', flag: '🇱🇨' },
  { code: '+685', name: 'Samoa', flag: '🇼🇸' },
  { code: '+378', name: 'San Marino', flag: '🇸🇲' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+221', name: 'Senegal', flag: '🇸🇳' },
  { code: '+381', name: 'Serbia', flag: '🇷🇸' },
  { code: '+248', name: 'Seychelles', flag: '🇸🇨' },
  { code: '+232', name: 'Sierra Leone', flag: '🇸🇱' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+421', name: 'Slovakia', flag: '🇸🇰' },
  { code: '+386', name: 'Slovenia', flag: '🇸🇮' },
  { code: '+677', name: 'Solomon Islands', flag: '🇸🇧' },
  { code: '+252', name: 'Somalia', flag: '🇸🇴' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+249', name: 'Sudan', flag: '🇸🇩' },
  { code: '+597', name: 'Suriname', flag: '🇸🇷' },
  { code: '+268', name: 'Eswatini', flag: '🇸🇿' },
  { code: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+963', name: 'Syria', flag: '🇸🇾' },
  { code: '+886', name: 'Taiwan', flag: '🇹🇼' },
  { code: '+992', name: 'Tajikistan', flag: '🇹🇯' },
  { code: '+255', name: 'Tanzania', flag: '🇹🇿' },
  { code: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: '+670', name: 'East Timor', flag: '🇹🇱' },
  { code: '+228', name: 'Togo', flag: '🇹🇬' },
  { code: '+676', name: 'Tonga', flag: '🇹🇴' },
  { code: '+1', name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { code: '+216', name: 'Tunisia', flag: '🇹🇳' },
  { code: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: '+993', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: '+688', name: 'Tuvalu', flag: '🇹🇻' },
  { code: '+256', name: 'Uganda', flag: '🇺🇬' },
  { code: '+380', name: 'Ukraine', flag: '🇺🇦' },
  { code: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+598', name: 'Uruguay', flag: '🇺🇾' },
  { code: '+998', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: '+678', name: 'Vanuatu', flag: '🇻🇺' },
  { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
  { code: '+84', name: 'Vietnam', flag: '🇻🇳' },
  { code: '+967', name: 'Yemen', flag: '🇾🇪' },
  { code: '+260', name: 'Zambia', flag: '🇿🇲' },
  { code: '+263', name: 'Zimbabwe', flag: '🇿🇼' },
];

const PhonePasswordStep = ({ data, updateData, onComplete }: PhonePasswordStepProps) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isSelectOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSelectOpen]);

  const filteredCountries = countryOptions.filter(country => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return true;
    
    return (
      country.name.toLowerCase().includes(searchLower) ||
      country.code.toLowerCase().includes(searchLower) ||
      country.code.replace('+', '').includes(searchLower) ||
      // Search by country short forms (ISO codes)
      country.name.toLowerCase().substring(0, 3).includes(searchLower) ||
      // Search by first letters of country name
      country.name.toLowerCase().split(' ').some(word => word.startsWith(searchLower))
    );
  });

  const validatePhone = (phone: string, countryCode: string) => {
    if (countryCode === '+88') {
      if (!phone.startsWith('01')) {
        return t('registration.phone.error.bangladesh');
      }
      if (phone.length !== 11) {
        return t('registration.phone.error.length');
      }
    }
    if (!/^\d+$/.test(phone)) {
      return t('registration.phone.error.numbers');
    }
    return '';
  };

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push(t('registration.password.error.length'));
    if (!/[A-Z]/.test(password)) errors.push(t('registration.password.error.uppercase'));
    if (!/[a-z]/.test(password)) errors.push(t('registration.password.error.lowercase'));
    if (!/\d/.test(password)) errors.push(t('registration.password.error.number'));
    if (!/[!@#$%^&*]/.test(password)) errors.push(t('registration.password.error.special'));
    return errors;
  };

  const handlePhoneChange = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (data.countryCode === '+88' && numbers.length <= 11) {
      updateData({ phone: numbers });
    } else if (data.countryCode !== '+88') {
      updateData({ phone: numbers });
    }
    
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleSendOTP = () => {
    const newErrors: Record<string, string> = {};
    
    const phoneError = validatePhone(data.phone, data.countryCode);
    if (phoneError) newErrors.phone = phoneError;
    
    const passwordErrors = validatePassword(data.password);
    if (passwordErrors.length > 0) newErrors.password = passwordErrors.join(', ');
    
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = t('registration.password.error.match');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowConfirmation(true);
  };

  if (showOTP) {
    return (
      <OTPVerification
        phoneNumber={`${data.countryCode} ${data.phone}`}
        onVerified={onComplete}
        onBack={() => setShowOTP(false)}
      />
    );
  }

  if (showConfirmation) {
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {t('register.step1.phone_confirmation')}
        </h2>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
            {data.countryCode} {data.phone}
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setShowConfirmation(false)}
            variant="outline"
            className="bg-white dark:bg-gray-700 border-[rgb(39,113,150)] text-[rgb(39,113,150)] dark:text-white hover:bg-[rgb(39,113,150)]/10 dark:hover:bg-gray-600 font-medium"
          >
            {t('register.step1.edit_phone')}
          </Button>
          <Button
            onClick={() => setShowOTP(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium"
          >
            {t('register.step1.confirm_phone')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('register.step1.title')}
        </h2>
      </div>

      <div className="space-y-6">
        {/* Country Code and Phone Number */}
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium text-sm">
            {t('register.step1.phone')} <span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-80 lg:w-96">
              <Select 
                value={data.countryCode} 
                onValueChange={(value) => updateData({ countryCode: value })}
                onOpenChange={setIsSelectOpen}
              >
                <SelectTrigger className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-medium hover:border-blue-300 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 h-12 shadow-sm">
                  <SelectValue className="text-sm font-medium" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 max-h-80 w-full min-w-[320px] sm:min-w-[380px] lg:min-w-[420px] z-[9999] shadow-2xl rounded-lg overflow-hidden">
                  <div className="sticky top-0 p-4 border-b-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 z-10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                      <Input
                        ref={searchInputRef}
                        placeholder="Search by country, code, or name..."
                        value={searchTerm}
                        onChange={(e) => {
                          e.stopPropagation();
                          setSearchTerm(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                        }}
                        onFocus={(e) => {
                          e.stopPropagation();
                        }}
                        className="pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md font-medium transition-all duration-200"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <SelectItem 
                          key={country.code} 
                          value={country.code} 
                          className="text-gray-900 dark:text-white font-medium hover:bg-blue-50 dark:hover:bg-gray-700 focus:bg-blue-100 dark:focus:bg-gray-600 cursor-pointer px-4 py-3 transition-all duration-150 border-b border-gray-50 dark:border-gray-700 last:border-b-0"
                          onSelect={() => setSearchTerm('')}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <span className="text-xl flex-shrink-0">{country.flag}</span>
                            <span className="font-bold text-blue-600 dark:text-blue-400 min-w-[65px] flex-shrink-0 text-sm">{country.code}</span>
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1 font-medium">{country.name}</span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                        <Search className="mx-auto mb-3 h-8 w-8 opacity-50" />
                        <p className="text-sm font-medium">No countries found</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try searching by name or code</p>
                      </div>
                    )}
                  </div>
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder={t('register.step1.phone_placeholder')}
                className={`pl-10 h-12 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium hover:border-blue-300 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 shadow-sm ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
              />
            </div>
          </div>
          {errors.phone && <p className="text-red-500 text-sm font-medium mt-2">{errors.phone}</p>}
        </div>

        {/* Password Fields */}
        <div className="space-y-3">
          <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium text-sm">
            {t('register.step1.password')} <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={data.password}
              onChange={(e) => updateData({ password: e.target.value })}
              placeholder={t('register.step1.password_placeholder')}
              className={`pr-10 h-12 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium hover:border-blue-300 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 shadow-sm ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm font-medium mt-2">{errors.password}</p>}
        </div>

        <div className="space-y-3">
          <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300 font-medium text-sm">
            {t('register.step1.confirm_password')} <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={data.confirmPassword}
              onChange={(e) => updateData({ confirmPassword: e.target.value })}
              placeholder={t('register.step1.confirm_placeholder')}
              className={`pr-10 h-12 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium hover:border-blue-300 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 shadow-sm ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm font-medium mt-2">{errors.confirmPassword}</p>}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
            {t('register.step1.password_requirements')}
          </p>
        </div>

        <Button
          onClick={handleSendOTP}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white font-semibold py-3 h-12 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          size="lg"
        >
          {t('register.step1.send_otp')}
        </Button>
      </div>
    </div>
  );
};

export default PhonePasswordStep;
