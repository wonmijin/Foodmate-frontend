import { atom } from 'recoil';

export const profileModalIsOpened = atom<boolean>({
  key: 'profileModalIsOpenedAtom',
  default: false,
});
