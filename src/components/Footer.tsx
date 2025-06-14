
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[rgb(39,113,150)] via-[rgb(75,145,185)] to-[rgb(129,130,135)] rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="text-white font-bold text-lg drop-shadow-md">O</span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-white drop-shadow-sm">OnnoRokom</span>
                <span className="bg-gradient-to-r from-[rgb(39,113,150)] via-[rgb(75,145,185)] to-[rgb(129,130,135)] bg-clip-text text-transparent"> Community</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quicklinks')}</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="/profile" className="text-gray-400 hover:text-white transition-colors">{t('nav.profile')}</a></li>
              <li><a href="/dashboard" className="text-gray-400 hover:text-white transition-colors">{t('nav.dashboard')}</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">{t('footer.about')}</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">{t('footer.contact.page')}</a></li>
            </ul>
          </div>

          {/* Admin Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.admin')}</h3>
            <ul className="space-y-2">
              <li><a href="/admin" className="text-gray-400 hover:text-white transition-colors">{t('footer.admin.panel')}</a></li>
              <li><a href="/admin/login" className="text-gray-400 hover:text-white transition-colors">{t('footer.admin.login')}</a></li>
              <li><a href="/admin/properties" className="text-gray-400 hover:text-white transition-colors">{t('footer.admin.properties')}</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  123 Community Street<br />
                  Dhaka, Bangladesh 1000
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 text-sm">+880 1234-567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 text-sm">info@onnorokom.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {t('footer.developed')}{' '}
            <span className="bg-gradient-to-r from-[rgb(39,113,150)] via-[rgb(75,145,185)] to-[rgb(129,130,135)] bg-clip-text text-transparent font-semibold">{t('footer.company')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
