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
      { path: 'meeting-info/history', title: '신청 내역' },
      { path: 'meeting-info/inquiry', title: '요청 조회' },
    ],
  },
  {
    path: 'mypage',
    title: '마이페이지',
    subList: [
      { path: 'mypage/modify-profile', title: '프로필 수정' },
      { path: 'mypage/modify-password', title: '비밀번호 변경' },
      { path: 'mypage/modify-quit', title: '회원 탈퇴' },
    ],
  },
];
