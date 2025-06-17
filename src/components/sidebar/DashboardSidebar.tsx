
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Search, 
  UserPlus, 
  Settings, 
  FileText, 
  ChevronRight,
  Menu
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './DashboardSidebar.module.css';

interface SidebarItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  path: string;
}

const DashboardSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      icon: BarChart3,
      label: t('sidebar.dashboard'),
      path: '/dashboard'
    },
    {
      id: 'deep-search',
      icon: Search,
      label: t('sidebar.deep.search'),
      path: '/deep-search'
    },
    {
      id: 'new-profile',
      icon: UserPlus,
      label: t('sidebar.new.profile'),
      path: '/new-profile'
    },
    {
      id: 'properties-settings',
      icon: Settings,
      label: t('sidebar.properties.settings'),
      path: '/properties-settings'
    },
    {
      id: 'csv-management',
      icon: FileText,
      label: t('sidebar.csv.management'),
      path: '/csv-management'
    }
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className={`${styles.sidebarToggle} fixed top-20 left-4 z-[60] md:hidden`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className={styles.sidebarContent}>
          {/* Menu Items */}
          <div className={styles.menuItems}>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.id}
                  className={`${styles.menuItem} ${active ? styles.active : ''} ${
                    isExpanded ? styles.expanded : styles.collapsed
                  }`}
                  onClick={() => handleItemClick(item.path)}
                  title={!isExpanded ? item.label : ''}
                >
                  <div className={styles.iconContainer}>
                    <Icon size={20} />
                  </div>
                  <span className={`${styles.itemLabel} ${isExpanded ? styles.visible : styles.hidden}`}>
                    {item.label}
                  </span>
                  {isExpanded && (
                    <ChevronRight 
                      size={16} 
                      className={`${styles.chevron} ${active ? styles.active : ''}`} 
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isExpanded && (
        <div 
          className={`${styles.overlay} md:hidden`}
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
