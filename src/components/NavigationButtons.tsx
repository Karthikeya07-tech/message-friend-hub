
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, Compass, Settings } from 'lucide-react';

export const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center gap-6 p-6">
      <Button
        onClick={() => navigate('/discover')}
        className="flex items-center gap-2 bg-red hover:bg-dark-pink text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105"
        size="lg"
      >
        <Compass className="h-5 w-5" />
        Discover
      </Button>
      
      <Button
        onClick={() => navigate('/chats')}
        className="flex items-center gap-2 bg-bright-pink hover:bg-dark-pink text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105"
        size="lg"
      >
        <MessageCircle className="h-5 w-5" />
        Chats
      </Button>
      
      <Button
        onClick={() => navigate('/settings')}
        className="flex items-center gap-2 bg-dark-pink hover:bg-red text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105"
        size="lg"
      >
        <Settings className="h-5 w-5" />
        Settings
      </Button>
    </div>
  );
};
