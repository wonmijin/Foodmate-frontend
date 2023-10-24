import { useQuery } from '@tanstack/react-query';
import { getChatroomMessage } from '../api/ChatApi';

export const useChatroomMessage = (chatroomId: number) => {
  return useQuery({
    queryKey: ['chatroomMessage'],
    queryFn: () => getChatroomMessage(chatroomId),
  });
};
