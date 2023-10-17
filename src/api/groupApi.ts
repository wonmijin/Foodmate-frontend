import axios from 'axios';
import { GeocodeType } from '../types/mapType';

// 전체 모임 리스트(최신순)
export const getAllGroups = async (page: number) => {
  try {
    const result = await axios.get(`/api/group/all?page=${page}`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

// 거리순 리스트 -> api 수정 요청
export const getCloseGroups = async (location: GeocodeType, page: number) => {
  try {
    const result = await axios.get(
      `/api/group/search/distance?latitude=${location.Ma}&longitude=${location.La}&page=${page}`,
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

// 날짜별 리스트
export const getDateSortedGroups = async (startDate: string, endDate: string, page: number) => {
  try {
    const result = await axios.get(`/api/group/search/date?start=${startDate}&end=${endDate}&page=${page}`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

// 메뉴별 리스트
export const getSelectedMenuGroups = async (foods: string[], page: number) => {
  try {
    const result = await axios.get(`/api/group/search/food?foods=${foods}&page=${page}`);
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
