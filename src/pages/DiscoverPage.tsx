
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Globe, Sparkles } from 'lucide-react';

export const DiscoverPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-light-pink dark:bg-dark-grey">
      <header className="bg-white/80 dark:bg-dark-grey/80 backdrop-blur-sm shadow-lg border-b border-dark-pink dark:border-light-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-red dark:text-bright-pink hover:bg-very-light-grey dark:hover:bg-light-grey"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold text-red dark:text-bright-pink">
                Discover
              </h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white/60 dark:bg-dark-grey/60 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-red p-4 rounded-full">
                <Globe className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-dark-grey dark:text-light-pink">
              Discover New Connections
            </h2>
            
            <p className="text-light-grey dark:text-very-light-grey max-w-md mx-auto">
              Find and connect with people around the world. Explore new conversations and build meaningful relationships.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-very-light-grey/50 dark:bg-light-grey/30 p-6 rounded-xl">
                <Users className="h-8 w-8 text-red dark:text-bright-pink mb-3" />
                <h3 className="font-semibold text-dark-grey dark:text-light-pink mb-2">Find People</h3>
                <p className="text-sm text-light-grey dark:text-very-light-grey">
                  Browse through user profiles and find people with similar interests.
                </p>
              </div>
              
              <div className="bg-dark-pink/20 dark:bg-bright-pink/30 p-6 rounded-xl">
                <Sparkles className="h-8 w-8 text-dark-pink dark:text-bright-pink mb-3" />
                <h3 className="font-semibold text-dark-grey dark:text-light-pink mb-2">Smart Matching</h3>
                <p className="text-sm text-light-grey dark:text-very-light-grey">
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
