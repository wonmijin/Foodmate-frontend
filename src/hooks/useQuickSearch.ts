import { useQuery } from "@tanstack/react-query";
import { quickSearchByKeyword } from "../api";

export const useQuickSearch = (keyword: string) => {
  return useQuery({
    queryKey: ['quickSearch', keyword],
    queryFn: () => quickSearchByKeyword(keyword),
    enabled: !!keyword,
  });
};