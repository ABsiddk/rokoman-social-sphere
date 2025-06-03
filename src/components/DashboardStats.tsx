
import React from 'react';
import { Users, Activity, TrendingUp, Shield, Calendar, CheckCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';

const DashboardStats = () => {
  const { currentUser, users } = useUser();
  const { t } = useLanguage();

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    adminCount: users.filter(u => u.role === 'admin').length,
    moderatorCount: users.filter(u => u.role === 'moderator').length,
    userCount: users.filter(u => u.role === 'user').length,
    recentLogins: users.filter(u => {
      const lastLogin = new Date(u.lastLogin);
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return lastLogin > dayAgo;
    }).length
  };

  const statCards = [
    {
      title: t('dashboard.stats.total.users'),
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: t('dashboard.stats.active.users'),
      value: stats.activeUsers,
      icon: Activity,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: t('dashboard.stats.recent.logins'),
      value: stats.recentLogins,
      icon: TrendingUp,
      color: 'from-[rgb(39,113,150)] to-[rgb(129,130,135)]',
      bgColor: 'bg-[rgb(39,113,150)]/10'
    },
    {
      title: t('dashboard.stats.administrators'),
      value: stats.adminCount,
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const roleDistribution = [
    { role: 'Admin', count: stats.adminCount, color: 'bg-purple-500' },
    { role: 'Moderator', count: stats.moderatorCount, color: 'bg-[rgb(39,113,150)]' },
    { role: 'User', count: stats.userCount, color: 'bg-[rgb(129,130,135)]' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">
          {t('dashboard.welcome')}, {currentUser?.name}!
        </h1>
        <p className="opacity-90">
          {t('dashboard.welcome.message')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} p-6 rounded-lg border border-gray-200 dark:border-gray-700`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role Distribution and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <Shield size={20} className="mr-2" />
            {t('dashboard.role.distribution')}
          </h3>
          <div className="space-y-3">
            {roleDistribution.map((role, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                  <span className="text-gray-600 dark:text-gray-400">{role.role}</span>
                </div>
                <span className="font-semibold text-gray-800 dark:text-white">{role.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <CheckCircle size={20} className="mr-2" />
            {t('dashboard.quick.actions')}
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-3">
                <Users size={16} className="text-[rgb(39,113,150)]" />
                <span className="text-gray-700 dark:text-gray-300">{t('dashboard.action.manage.users')}</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-3">
                <Activity size={16} className="text-[rgb(39,113,150)]" />
                <span className="text-gray-700 dark:text-gray-300">{t('dashboard.action.view.activity')}</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-3">
                <Shield size={16} className="text-[rgb(39,113,150)]" />
                <span className="text-gray-700 dark:text-gray-300">{t('dashboard.action.security.settings')}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
