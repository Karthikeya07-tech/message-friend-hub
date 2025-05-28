
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Users, Clock } from 'lucide-react';

interface RecentChat {
  id: string;
  participant_name: string;
  participant_id: string;
  last_message: string;
  last_message_time: string;
  is_group: boolean;
  group_name?: string;
}

interface RecentChatsProps {
  onSelectChat: (chatId: string, chatName: string, isGroup?: boolean) => void;
}

export const RecentChats: React.FC<RecentChatsProps> = ({ onSelectChat }) => {
  const [recentChats, setRecentChats] = useState<RecentChat[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchRecentChats();
    }
  }, [user]);

  const fetchRecentChats = async () => {
    try {
      // Get recent conversations with last message
      const { data: conversations, error } = await supabase
        .from('conversations')
        .select(`
          id,
          participant_1,
          participant_2,
          is_group,
          group_id,
          messages!inner(content, created_at, sender_id)
        `)
        .or(`participant_1.eq.${user!.id},participant_2.eq.${user!.id}`)
        .order('messages(created_at)', { ascending: false })
        .limit(5);

      if (error) throw error;

      // Process conversations to get participant names
      const processedChats: RecentChat[] = [];
      
      for (const conv of conversations || []) {
        const otherParticipant = conv.participant_1 === user!.id ? conv.participant_2 : conv.participant_1;
        
        if (conv.is_group && conv.group_id) {
          // Get group name
          const { data: group } = await supabase
            .from('groups')
            .select('name')
            .eq('id', conv.group_id)
            .single();

          if (group) {
            processedChats.push({
              id: conv.id,
              participant_name: group.name,
              participant_id: conv.group_id,
              last_message: conv.messages[0]?.content || '',
              last_message_time: conv.messages[0]?.created_at || '',
              is_group: true,
              group_name: group.name
            });
          }
        } else {
          // Get participant profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', otherParticipant)
            .single();

          if (profile) {
            processedChats.push({
              id: conv.id,
              participant_name: profile.full_name,
              participant_id: otherParticipant,
              last_message: conv.messages[0]?.content || '',
              last_message_time: conv.messages[0]?.created_at || '',
              is_group: false
            });
          }
        }
      }

      setRecentChats(processedChats);
    } catch (error) {
      console.error('Error fetching recent chats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-purple-600" />
          Recent Chats
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentChats.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent chats</p>
        ) : (
          <div className="space-y-3">
            {recentChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onSelectChat(chat.participant_id, chat.participant_name, chat.is_group)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                    {chat.is_group ? <Users className="h-5 w-5" /> : chat.participant_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{chat.participant_name}</p>
                    {chat.is_group && <Users className="h-3 w-3 text-purple-500" />}
                  </div>
                  <p className="text-xs text-gray-600 truncate">{chat.last_message}</p>
                </div>
                <div className="text-xs text-gray-400">
                  {chat.last_message_time && new Date(chat.last_message_time).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
