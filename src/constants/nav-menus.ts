export const NAV_MENUS: {
  path: string;
  title: string;
  subList?: { path: string; title: string }[];
}[] = [
  { path: 'findfoodmate', title: '밥 친구 구해요' },
  { path: 'neighborhood', title: '내 근처 모임' },
  {
    path: 'meeting-info',
    title: '모임 정보',
    subList: [
      { path: 'history', title: '신청 내역' },
      { path: 'inquiry', title: '요청 조회' },
    ],
  },
  { path: 'mypage', title: '마이페이지' },
];
