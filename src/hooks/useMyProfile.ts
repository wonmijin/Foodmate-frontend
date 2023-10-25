import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '../api/memberApi';

export const useMyProfile = (isLogin: boolean) => {
  return useQuery({
    queryKey: ['myProfile', isLogin],
    queryFn: () => getMyProfile(),
    enabled: isLogin,
  });
};
