
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
    <div className="min-h-screen bg-light-pink dark:bg-dark-grey">
      <header className="bg-white/80 dark:bg-dark-grey/80 backdrop-blur-sm shadow-lg border-b border-dark-pink dark:border-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-3xl font-bold text-red dark:text-bright-pink">
              Cynefin
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userProfile.avatarUrl} />
                  <AvatarFallback className="bg-red text-white text-sm">
                    {userProfile.fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-dark-grey dark:text-light-pink">
                    {userProfile.fullName}
                  </span>
                  <span className="text-xs text-light-grey dark:text-very-light-grey">
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
            <div className="flex justify-center mt-8">
              <NavigationButtons />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
