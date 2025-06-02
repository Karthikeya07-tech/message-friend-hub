
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { UserDirectory } from '@/components/UserDirectory';
import { ChatWindow } from '@/components/ChatWindow';

export const ChatsPage = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<{id: string, name: string} | null>(null);

  const handleUserSelect = (userId: string, userName: string) => {
    setSelectedUser({ id: userId, name: userName });
  };

  const handleBack = () => {
    if (selectedUser) {
      setSelectedUser(null);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-light-gray dark:bg-dark-gray">
      <header className="bg-white/80 dark:bg-dark-gray/80 backdrop-blur-sm shadow-lg border-b border-border-gray dark:border-medium-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleBack}
                className="text-primary-blue dark:text-primary-blue hover:bg-light-gray dark:hover:bg-medium-gray"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold text-primary-blue dark:text-primary-blue">
                {selectedUser ? `Chat with ${selectedUser.name}` : 'Chats'}
              </h1>
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
