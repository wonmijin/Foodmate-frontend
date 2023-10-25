import { useQuery } from '@tanstack/react-query';
import { getMeetingRanking } from '../api/rankingApi';

export const useMeetingRanking = () => {
  return useQuery({
    queryKey: ['meetingRanking'],
    queryFn: () => getMeetingRanking(),
  });
};
