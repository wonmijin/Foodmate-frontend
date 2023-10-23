import { atom } from 'recoil';

export const requestCategory = atom<string>({
  key: 'requestCategoryAtom',
  default: '받은 요청',
});
