import { useQuery } from "@tanstack/react-query";
import { quickSearchByKeyword } from "../api/groupApi";

export const useQuickSearch = (keyword: string) => {
  return useQuery({
    queryKey: ['quickSearch', keyword],
    queryFn: () => quickSearchByKeyword(keyword),
    enabled: !!keyword,
  });
};