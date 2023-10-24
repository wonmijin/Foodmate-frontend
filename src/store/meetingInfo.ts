import { atom } from 'recoil';

export const requestCategory = atom<string>({
  key: 'requestCategoryAtom',
  default: '받은 요청',
});

export const subscriptionCategory = atom<string>({
  key: 'subscriptionCategoryAtom',
  default: '신청 현황',
});
