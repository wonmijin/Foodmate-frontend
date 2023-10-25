import { LABELCOLOR } from '../constants/menu';

export const findMatchingMenu = (foodItem: string) => {
  const matchingMenu = LABELCOLOR.find((item) => item.menu.startsWith(foodItem[0]));
  return matchingMenu ? matchingMenu.menu : null;
};
