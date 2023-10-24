import axios from 'axios';
import { LikesRankingType, MeetingRankingType } from '../types/ranking';

export const getLikesRanking = async (): Promise<LikesRankingType[]> => {
  const { data } = await axios.get(`/api/ranking/likes`);

  return data;
};

export const getMeetingRanking = async (): Promise<MeetingRankingType[]> => {
  const { data } = await axios.get(`/api/ranking/meeting`);

  return data;
};

export const getFoodRanking = async (): Promise<LikesRankingType[]> => {
  const { data } = await axios.get(`/api/ranking/food`);

  return data;
};
