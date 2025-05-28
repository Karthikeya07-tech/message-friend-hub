
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Globe, Sparkles } from 'lucide-react';

export const DiscoverPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-blue-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Discover
              </h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-full">
                <Globe className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Discover New Connections
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Find and connect with people around the world. Explore new conversations and build meaningful relationships.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Find People</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Browse through user profiles and find people with similar interests.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl">
                <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Smart Matching</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
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
