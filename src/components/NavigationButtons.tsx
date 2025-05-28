
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, Compass, Settings } from 'lucide-react';

export const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="flex justify-center gap-4 p-6">
        <Button
          onClick={() => navigate('/discover')}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105"
          size="lg"
        >
          <Compass className="h-5 w-5" />
          Discover
        </Button>
        
        <Button
          onClick={() => navigate('/chats')}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105"
          size="lg"
        >
          <MessageCircle className="h-5 w-5" />
          Chats
        </Button>
        
        <Button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105"
          size="lg"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Button>
      </div>
    </div>
  );
};
