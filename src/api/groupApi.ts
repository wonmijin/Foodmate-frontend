import axios from 'axios';
import { GeocodeType } from '../types/mapType';

// 전체 모임 리스트(최신순)
export const getAllGroups = async () => {
  try {
    const result = await axios.get('/api/group/all');
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

// 거리순 리스트 -> api 수정 요청
export const getCloseGroups = async ({ La, Ma }: GeocodeType) => {
  try {
    const result = await axios.get(`/api/group/search/distance?latitude=${Ma}&longitude=${La}`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

// 날짜별 리스트
export const getDateSortedGroups = async (startDate: string, endDate: string) => {
  try {
    const result = await axios.get(`/api/group/search/date?start=${startDate}&end=${endDate}`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

// 메뉴별 리스트
export const getSelectedMenuGroups = async (foods: string[]) => {
  try {
    const result = await axios.get(`/api/group/search/food?foods=${foods}`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

// 검색 리스트
export const getSearchGroups = async (keyword: string) => {
  try {
    const result = await axios.get(`api/group/search?keyword=${keyword}`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
