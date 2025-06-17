
import React from 'react';
import { User } from '../../contexts/UserContext';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Mail, Phone, MapPin, Building, Eye, Calendar } from 'lucide-react';

interface UserCardProps {
  user: User;
  viewMode: string;
  onViewProfile: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, viewMode, onViewProfile }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'moderator': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || '/placeholder.svg'}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{user.designation}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>
            <Button size="sm" onClick={() => onViewProfile(user)}>
              <Eye size={16} className="mr-1" />
              View
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'details') {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium text-gray-900 dark:text-white">Avatar</td>
              <td className="p-4">
                <img
                  src={user.avatar || '/placeholder.svg'}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="p-4 font-medium text-gray-900 dark:text-white">Name</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">{user.name}</td>
              <td className="p-4 font-medium text-gray-900 dark:text-white">Role</td>
              <td className="p-4">
                <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
              </td>
              <td className="p-4">
                <Button size="sm" onClick={() => onViewProfile(user)}>
                  <Eye size={16} className="mr-1" />
                  View
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // Card view modes (extra-large, large, medium, small, tiles)
  const getCardSize = () => {
    switch (viewMode) {
      case 'extra-large': return 'w-80 h-96';
      case 'large': return 'w-72 h-80';
      case 'medium': return 'w-64 h-72';
      case 'small': return 'w-56 h-64';
      case 'tiles': return 'w-60 h-48';
      default: return 'w-64 h-72';
    }
  };

  const getImageSize = () => {
    switch (viewMode) {
      case 'extra-large': return 'w-24 h-24';
      case 'large': return 'w-20 h-20';
      case 'medium': return 'w-16 h-16';
      case 'small': return 'w-12 h-12';
      case 'tiles': return 'w-14 h-14';
      default: return 'w-16 h-16';
    }
  };

  return (
    <Card className={`${getCardSize()} hover:shadow-lg transition-shadow cursor-pointer`}>
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex flex-col items-center text-center mb-4">
          <img
            src={user.avatar || '/placeholder.svg'}
            alt={user.name}
            className={`${getImageSize()} rounded-full object-cover mb-2`}
          />
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
            {user.name}
          </h3>
          <Badge className={`${getRoleBadgeColor(user.role)} text-xs mt-1`}>
            {user.role}
          </Badge>
        </div>

        <div className="flex-1 space-y-2 text-xs text-gray-600 dark:text-gray-300">
          {viewMode !== 'small' && (
            <>
              <div className="flex items-center gap-1">
                <Mail size={12} />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={12} />
                <span className="truncate">{user.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span className="truncate">{user.address}</span>
              </div>
            </>
          )}
          
          {(viewMode === 'extra-large' || viewMode === 'large') && (
            <>
              <div className="flex items-center gap-1">
                <Building size={12} />
                <span className="truncate">{user.institution}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>Joined {formatDate(user.joinDate)}</span>
              </div>
            </>
          )}
        </div>

        <Button
          size="sm"
          className="w-full mt-4"
          onClick={() => onViewProfile(user)}
        >
          <Eye size={14} className="mr-1" />
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
