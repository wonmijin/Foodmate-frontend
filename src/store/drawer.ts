import { atom } from 'recoil';

/**
 * 768px 이하 일 때, drawer의 상태 
 */
const drawerState = atom<boolean>({
  key: 'drawerState',
  default: false,
});

export default drawerState;
