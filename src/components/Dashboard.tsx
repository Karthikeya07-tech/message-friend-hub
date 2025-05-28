
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserDirectory } from './UserDirectory';
import { ChatWindow } from './ChatWindow';
import { NavigationButtons } from './NavigationButtons';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const Dashboard = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<{id: string, name: string} | null>(null);
  const [userProfile, setUserProfile] = useState({
    fullName: '',
    avatarUrl: ''
  });

  useEffect(() => {
    if (user) {
      setUserProfile({
        fullName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        avatarUrl: user.user_metadata?.avatar_url || ''
      });
    }
  }, [user]);

  const handleUserSelect = (userId: string, userName: string) => {
    setSelectedUser({ id: userId, name: userName });
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-purple-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Cynefin
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userProfile.avatarUrl} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                    {userProfile.fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {userProfile.fullName}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto p-6">
        {selectedUser ? (
          <ChatWindow
            recipientId={selectedUser.id}
            recipientName={selectedUser.name}
            onBack={handleBack}
          />
        ) : (
          <div className="flex flex-col min-h-[calc(100vh-200px)]">
            <div className="flex-1">
              <UserDirectory onSelectUser={handleUserSelect} />
            </div>
            <div className="mt-auto pt-6">
              <NavigationButtons />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
