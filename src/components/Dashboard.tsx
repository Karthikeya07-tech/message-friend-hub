
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserDirectory } from './UserDirectory';
import { ChatWindow } from './ChatWindow';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [selectedUser, setSelectedUser] = useState<{id: string, name: string} | null>(null);

  const handleUserSelect = (userId: string, userName: string) => {
    setSelectedUser({ id: userId, name: userName });
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-indigo-600">Cynefin</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
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
          <UserDirectory onSelectUser={handleUserSelect} />
        )}
      </main>
    </div>
  );
};
