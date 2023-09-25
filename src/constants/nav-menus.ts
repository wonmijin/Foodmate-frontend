export const NAV_MENUS: {
  path: string;
  title: string;
  subList?: { path: string; title: string }[];
}[] = [
  { path: '/findfoodmate', title: '밥친구구해요' },
  { path: '/neighborhood', title: '내근처모임' },
  {
    path: '/myapply',
    title: '모임정보',
    subList: [
      { path: '/myapply', title: '나의 신청내역' },
      { path: '/check', title: '모임 수락 / 거절' },
    ],
  },
  { path: '/mypage', title: '마이페이지' },
];
