
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, LogOut, Moon, Sun, Monitor, Camera, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, setTheme, isDark } = useTheme();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      setAvatarUrl(data.publicUrl);
      toast.success('Profile photo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload profile photo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          avatar_url: avatarUrl,
        }
      });

      if (error) throw error;

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

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
                Settings
              </h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-2xl mx-auto p-6">
        <div className="bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8">
          {/* Profile Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-black dark:text-white">Profile</h2>
            
            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="bg-primary-red text-white text-xl">
                  {fullName ? fullName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col items-center space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-2 border-border-gray dark:border-dark-gray hover:bg-light-gray dark:hover:bg-dark-gray"
                >
                  <Camera className="h-4 w-4" />
                  {isUploading ? 'Uploading...' : 'Change Photo'}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black dark:text-white">
                Display Name
              </label>
              <div className="flex gap-2">
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your display name"
                  className="flex-1 border-border-gray focus:border-primary-red dark:border-dark-gray dark:focus:border-primary-red"
                />
              </div>
            </div>

            {/* Email (read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <Input
                value={user?.email || ''}
                readOnly
                className="bg-light-gray dark:bg-dark-gray border-border-gray dark:border-dark-gray"
              />
            </div>

            <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full bg-primary-red hover:bg-dark-red text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>

          {/* Theme Settings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-light-gray dark:bg-dark-gray rounded-xl">
                <div className="flex items-center gap-3">
                  {isDark ? <Moon className="h-5 w-5 text-primary-red dark:text-primary-red" /> : <Sun className="h-5 w-5 text-primary-red dark:text-primary-red" />}
                  <span className="font-medium text-black dark:text-white">Dark Mode</span>
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
                  className={`flex items-center gap-2 ${
                    theme === 'light' 
                      ? 'bg-primary-red hover:bg-dark-red text-white' 
                      : 'border-border-gray dark:border-dark-gray text-black dark:text-white hover:bg-light-gray dark:hover:bg-dark-gray'
                  }`}
                >
                  <Sun className="h-4 w-4" />
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-2 ${
                    theme === 'dark' 
                      ? 'bg-primary-red hover:bg-dark-red text-white' 
                      : 'border-border-gray dark:border-dark-gray text-black dark:text-white hover:bg-light-gray dark:hover:bg-dark-gray'
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('system')}
                  className={`flex items-center gap-2 ${
                    theme === 'system' 
                      ? 'bg-primary-red hover:bg-dark-red text-white' 
                      : 'border-border-gray dark:border-dark-gray text-black dark:text-white hover:bg-light-gray dark:hover:bg-dark-gray'
                  }`}
                >
                  <Monitor className="h-4 w-4" />
                  System
                </Button>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">Account Actions</h2>
            <Button
              onClick={handleSignOut}
              variant="destructive"
              className="w-full flex items-center gap-2 bg-dark-red hover:bg-primary-red text-white"
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
