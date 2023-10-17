import { useQuery } from '@tanstack/react-query';
import { getLikesRanking } from '../api/rankingApi';

export const useLikesRanking = () => {
  return useQuery({
    queryKey: ['likesRanking'],
    queryFn: () => getLikesRanking(),
  });
};
