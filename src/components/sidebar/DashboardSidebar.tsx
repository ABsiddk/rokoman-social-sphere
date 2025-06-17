
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './DashboardSidebar.module.css';
import { 
  BarChart3, 
  Search, 
  UserPlus, 
  Settings, 
  FileText 
} from 'lucide-react';

interface SidebarItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  route: string;
}

const DashboardSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems: SidebarItem[] = [
    {
      id: 'dashboard',
      icon: BarChart3,
      label: t('sidebar.dashboard'),
      route: '/dashboard'
    },
    {
      id: 'deep-search',
      icon: Search,
      label: t('sidebar.deepSearch'),
      route: '/deep-search'
    },
    {
      id: 'new-profile',
      icon: UserPlus,
      label: t('sidebar.newProfile'),
      route: '/new-profile'
    },
    {
      id: 'properties-settings',
      icon: Settings,
      label: t('sidebar.propertiesSettings'),
      route: '/properties-settings'
    },
    {
      id: 'csv-management',
      icon: FileText,
      label: t('sidebar.csvManagement'),
      route: '/csv-management'
    }
  ];

  const handleItemClick = (route: string) => {
    navigate(route);
  };

  const isActive = (route: string) => location.pathname === route;

  return (
    <div 
      className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={styles.sidebarContent}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.route)}
              className={`${styles.sidebarButton} ${isActive(item.route) ? styles.active : ''}`}
              title={!isExpanded ? item.label : ''}
            >
              <div className={styles.buttonContent}>
                <IconComponent size={20} className={styles.buttonIcon} />
                {isExpanded && (
                  <span className={styles.buttonLabel}>{item.label}</span>
                )}
              </div>
              <div className={styles.liquidEffect}></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardSidebar;
