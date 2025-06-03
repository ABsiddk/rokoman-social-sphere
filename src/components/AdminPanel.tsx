
import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Search, Filter, UserCheck, UserX } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useUser, User, UserRole } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const { currentUser, users, createUser, updateUser, deleteUser, hasPermission } = useUser();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as UserRole,
    phone: '',
    address: '',
    isActive: true
  });

  const filteredUsers = users.filter(user => {
    const primaryEmail = user.emails.length > 0 ? user.emails[0].email : '';
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         primaryEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: t('admin.error'),
        description: t('admin.fill.required.fields'),
        variant: 'destructive'
      });
      return;
    }

    const userData = {
      name: newUser.name,
      nickNames: [],
      emails: [{ id: '1', email: newUser.email, type: 'personal' as const }],
      phones: [{ id: '1', phone: newUser.phone || '', type: 'personal' as const }],
      presentAddress: { district: '', address: newUser.address || '' },
      permanentAddress: { district: '', address: newUser.address || '' },
      experiences: [],
      role: newUser.role,
      isActive: newUser.isActive
    };

    createUser(userData);
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      phone: '',
      address: '',
      isActive: true
    });
    setShowCreateForm(false);
    toast({
      title: t('admin.success'),
      description: t('admin.user.created.successfully')
    });
  };

  const handleUpdateUser = (userId: string, updates: Partial<User>) => {
    updateUser(userId, updates);
    setEditingUser(null);
    toast({
      title: t('admin.success'),
      description: t('admin.user.updated.successfully')
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (currentUser?.id === userId) {
      toast({
        title: t('admin.error'),
        description: t('admin.cannot.delete.yourself'),
        variant: 'destructive'
      });
      return;
    }

    deleteUser(userId);
    toast({
      title: t('admin.success'),
      description: t('admin.user.deleted.successfully')
    });
  };

  if (!hasPermission('moderator')) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('admin.access.denied')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('admin.insufficient.permissions')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <Users size={28} className="mr-3 text-[rgb(39,113,150)]" />
          {t('admin.user.management')}
        </h1>
        {hasPermission('admin') && (
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90"
          >
            <Plus size={16} className="mr-2" />
            {t('admin.create.user')}
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={t('admin.search.users')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-[rgb(129,130,135)]/30 focus:border-[rgb(39,113,150)]"
          />
        </div>
        <div className="relative">
          <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
            className="pl-10 pr-4 py-2 border border-[rgb(129,130,135)]/30 rounded-md focus:border-[rgb(39,113,150)] focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option value="all">{t('admin.all.roles')}</option>
            <option value="admin">{t('admin.role.admin')}</option>
            <option value="moderator">{t('admin.role.moderator')}</option>
            <option value="user">{t('admin.role.user')}</option>
          </select>
        </div>
      </div>

      {/* Create User Form */}
      {showCreateForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {t('admin.create.new.user')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder={t('profile.name')}
              value={newUser.name}
              onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              type="email"
              placeholder={t('profile.email')}
              value={newUser.email}
              onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
            />
            <Input
              placeholder={t('profile.phone')}
              value={newUser.phone}
              onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as UserRole }))}
              className="px-3 py-2 border border-[rgb(129,130,135)]/30 rounded-md focus:border-[rgb(39,113,150)] focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              <option value="user">{t('admin.role.user')}</option>
              <option value="moderator">{t('admin.role.moderator')}</option>
              {hasPermission('admin') && <option value="admin">{t('admin.role.admin')}</option>}
            </select>
            <Input
              placeholder={t('profile.address')}
              value={newUser.address}
              onChange={(e) => setNewUser(prev => ({ ...prev, address: e.target.value }))}
              className="md:col-span-2"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleCreateUser} className="bg-green-600 hover:bg-green-700">
              {t('admin.create.user')}
            </Button>
            <Button onClick={() => setShowCreateForm(false)} variant="outline">
              {t('common.cancel')}
            </Button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.table.user')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.table.role')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.table.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.table.last.login')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('admin.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.emails.length > 0 ? user.emails[0].email : 'No email'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      user.role === 'moderator' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.isActive ? (
                        <UserCheck size={16} className="text-green-500 mr-2" />
                      ) : (
                        <UserX size={16} className="text-red-500 mr-2" />
                      )}
                      <span className={`text-sm ${user.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {user.isActive ? t('admin.status.active') : t('admin.status.inactive')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingUser(user)}
                        className="text-[rgb(39,113,150)] border-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)] hover:text-white"
                      >
                        <Edit size={14} />
                      </Button>
                      {hasPermission('admin') && user.id !== currentUser?.id && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 size={14} />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
