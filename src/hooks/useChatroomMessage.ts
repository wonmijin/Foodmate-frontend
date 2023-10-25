import { useQuery } from '@tanstack/react-query';
import { getChatroomMessage } from '../api/ChatApi';
import { ChatroomType } from '../types/chatroomType';

export const useChatroomMessage = (chatroom: ChatroomType) => {
  return useQuery({
    queryKey: ['chatroomMessage', chatroom.lastMessageTime],
    queryFn: () => getChatroomMessage(chatroom.chatRoomId),
  });
};
