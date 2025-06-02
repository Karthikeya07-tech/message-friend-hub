
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Users } from 'lucide-react';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
}

interface UserDirectoryProps {
  onSelectUser: (userId: string, userName: string) => void;
}

export const UserDirectory: React.FC<UserDirectoryProps> = ({ onSelectUser }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchProfiles();
  }, [user]);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url')
        .neq('id', user?.id);

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6 text-primary-red" />
        <h2 className="text-xl font-semibold text-black dark:text-white">All Users</h2>
      </div>
      
      {profiles.length === 0 ? (
        <Card className="bg-white dark:bg-dark-gray border-border-gray dark:border-medium-gray">
          <CardContent className="p-6 text-center text-medium-gray dark:text-medium-gray">
            No other users found. Be the first to start a conversation!
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {profiles.map((profile) => (
            <Card 
              key={profile.id} 
              className="cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-dark-gray border-border-gray dark:border-medium-gray hover:border-primary-red dark:hover:border-primary-red"
              onClick={() => onSelectUser(profile.id, profile.full_name)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary-red text-white">
                        {profile.full_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-black dark:text-white">{profile.full_name}</h3>
                      <p className="text-sm text-medium-gray dark:text-medium-gray">{profile.email}</p>
                    </div>
                  </div>
                  <MessageCircle className="h-5 w-5 text-primary-red" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
