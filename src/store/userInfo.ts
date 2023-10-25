import { atom } from 'recoil';

export const profileModalIsOpened = atom<boolean>({
  key: 'profileModalIsOpenedAtom',
  default: false,
});

export const imageAndFoodsModifiedData = atom<{ image: File | null; food: string[] }>({
  key: 'imageAndFoodsModifiedDataAtom',
  default: {
    image: null,
    food: [],
  },
});
