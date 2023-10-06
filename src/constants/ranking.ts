export enum RankingType {
  Like,
  MeetingKing,
  Place,
  Category,
}

export const rankingCategories = [
  { label: '좋아요', type: RankingType.Like },
  { label: '모임왕', type: RankingType.MeetingKing },
  { label: '핫플레이스', type: RankingType.Place },
  { label: '카테고리', type: RankingType.Category },
];
