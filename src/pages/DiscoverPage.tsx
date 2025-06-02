
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Globe, Sparkles } from 'lucide-react';

export const DiscoverPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-lg border-b border-border-gray dark:border-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-primary-red dark:text-primary-red hover:bg-light-gray dark:hover:bg-dark-gray"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold text-primary-red dark:text-primary-red">
                Discover
              </h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-primary-red p-4 rounded-full">
                <Globe className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Discover New Connections
            </h2>
            
            <p className="text-medium-gray dark:text-medium-gray max-w-md mx-auto">
              Find and connect with people around the world. Explore new conversations and build meaningful relationships.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-light-gray/50 dark:bg-dark-gray/30 p-6 rounded-xl">
                <Users className="h-8 w-8 text-primary-red dark:text-primary-red mb-3" />
                <h3 className="font-semibold text-black dark:text-white mb-2">Find People</h3>
                <p className="text-sm text-medium-gray dark:text-medium-gray">
                  Browse through user profiles and find people with similar interests.
                </p>
              </div>
              
              <div className="bg-border-gray/20 dark:bg-medium-gray/30 p-6 rounded-xl">
                <Sparkles className="h-8 w-8 text-primary-red dark:text-primary-red mb-3" />
                <h3 className="font-semibold text-black dark:text-white mb-2">Smart Matching</h3>
                <p className="text-sm text-medium-gray dark:text-medium-gray">
                  Get personalized recommendations based on your activity and preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
