export enum RankingType {
  Like,
  MeetingKing,
  Category,
}

export const rankingCategories = [
  { label: '좋아요', type: RankingType.Like },
  { label: '모임왕', type: RankingType.MeetingKing },
  { label: '카테고리', type: RankingType.Category },
];
