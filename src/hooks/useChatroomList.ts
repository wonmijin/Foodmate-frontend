import { useQuery } from '@tanstack/react-query';
import { getChatroomList } from '../api/ChatApi';

export const useChatroomList = () => {
  return useQuery({
    queryKey: ['chatroomList'],
    queryFn: () => getChatroomList(),
  });
};
