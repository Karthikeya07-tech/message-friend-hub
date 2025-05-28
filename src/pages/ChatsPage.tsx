
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, MessageCircle, Users, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ChatWindow } from '@/components/ChatWindow';

interface Chat {
  id: string;
  participant_name: string;
  participant_id: string;
  last_message: string;
  last_message_time: string;
  is_group: boolean;
  group_name?: string;
}

export const ChatsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<{id: string, name: string, isGroup?: boolean} | null>(null);
  const [allChats, setAllChats] = useState<Chat[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAllChats();
    }
  }, [user]);

  useEffect(() => {
    const filtered = allChats.filter(chat =>
      chat.participant_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [searchTerm, allChats]);

  const fetchAllChats = async () => {
    try {
      // Get all conversations for the user
      const { data: conversations, error } = await supabase
        .from('conversations')
        .select(`
          id,
          participant_1,
          participant_2,
          is_group,
          group_id,
          messages(content, created_at, sender_id)
        `)
        .or(`participant_1.eq.${user!.id},participant_2.eq.${user!.id}`)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Process conversations to get participant names
      const processedChats: Chat[] = [];
      
      for (const conv of conversations || []) {
        const otherParticipant = conv.participant_1 === user!.id ? conv.participant_2 : conv.participant_1;
        const lastMessage = conv.messages?.[0];
        
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
              last_message: lastMessage?.content || 'No messages yet',
              last_message_time: lastMessage?.created_at || '',
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
              last_message: lastMessage?.content || 'No messages yet',
              last_message_time: lastMessage?.created_at || '',
              is_group: false
            });
          }
        }
      }

      setAllChats(processedChats);
      setFilteredChats(processedChats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSelect = (chatId: string, chatName: string, isGroup?: boolean) => {
    setSelectedUser({ id: chatId, name: chatName, isGroup });
  };

  const handleBack = () => {
    if (selectedUser) {
      setSelectedUser(null);
    } else {
      navigate('/');
    }
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
                onClick={handleBack}
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {selectedUser ? `Chat with ${selectedUser.name}` : 'All Chats'}
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-indigo-600" />
                All Conversations
              </CardTitle>
              <div className="flex items-center gap-2 mt-4">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : filteredChats.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? 'No chats found matching your search' : 'No conversations yet. Start chatting with someone!'}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border"
                      onClick={() => handleChatSelect(chat.participant_id, chat.participant_name, chat.is_group)}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-r from-indigo-400 to-blue-400 text-white">
                          {chat.is_group ? <Users className="h-6 w-6" /> : chat.participant_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{chat.participant_name}</p>
                          {chat.is_group && <Users className="h-4 w-4 text-indigo-500" />}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chat.last_message}</p>
                      </div>
                      <div className="text-sm text-gray-400">
                        {chat.last_message_time && new Date(chat.last_message_time).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};
