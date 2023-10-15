import axios from 'axios';
import { LikesRankingType, MeetingRankingType } from '../types/ranking';

export const getLikesRanking = async (): Promise<LikesRankingType[]> => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/ranking/likes`);

  return data;
};

export const getMeetingRanking = async (): Promise<MeetingRankingType[]> => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/ranking/meeting`);

  return data;
};

export const getFoodRanking = async (): Promise<LikesRankingType[]> => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/ranking/food`);

  return data;
};

