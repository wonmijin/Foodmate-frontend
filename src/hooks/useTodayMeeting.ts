import { useQuery } from '@tanstack/react-query';
import { todayMeeting } from '../api/groupApi';

export const useTodayMeeting = (page: number) => {
  return useQuery({
    queryKey: ['todayMeeting', page],
    queryFn: () => todayMeeting(page),
  });
};
