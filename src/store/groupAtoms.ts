import { atom } from 'recoil';

export const signedUserInfo = atom({
  key: 'signedUserInfoAtom',
  default: {
    memberId: 0,
    email: '',
    nickname: '',
    image: '',
    likes: 0,
    food: [],
  },
});
