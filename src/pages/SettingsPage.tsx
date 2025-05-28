
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, LogOut, Moon, Sun, Monitor } from 'lucide-react';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, setTheme, isDark } = useTheme();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
                Settings
              </h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-2xl mx-auto p-6">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8">
          {/* User Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Account</h2>
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-300">Email</p>
              <p className="font-medium text-gray-800 dark:text-white">{user?.email}</p>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
                <div className="flex items-center gap-3">
                  {isDark ? <Moon className="h-5 w-5 text-purple-600 dark:text-purple-400" /> : <Sun className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                  <span className="font-medium text-gray-800 dark:text-white">Dark Mode</span>
                </div>
                <Switch
                  checked={isDark}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                  className="flex items-center gap-2"
                >
                  <Sun className="h-4 w-4" />
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                  className="flex items-center gap-2"
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('system')}
                  className="flex items-center gap-2"
                >
                  <Monitor className="h-4 w-4" />
                  System
                </Button>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Account Actions</h2>
            <Button
              onClick={handleSignOut}
              variant="destructive"
              className="w-full flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
