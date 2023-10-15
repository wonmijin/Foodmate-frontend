import axios from 'axios';
import QuickSearchType from '../types/quickSearchType';
import Pagination from '../types/pagination';
import TodayMeetingType from '../types/todayMeetingType';

export const quickSearchByKeyword = async (keyword: string): Promise<Pagination<QuickSearchType>> => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/group/search?keyword=${keyword}`);
  return data;
};

export const todayMeeting = async (page: number): Promise<Pagination<TodayMeetingType>> => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/group/today?page=${page}`);
  return data;
};
