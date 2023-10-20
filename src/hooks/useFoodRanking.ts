import { useQuery } from "@tanstack/react-query"
import { getFoodRanking } from "../api/rankingApi"

export const useFoodRanking = () => {
  return useQuery({
    queryKey: ['foodRanking'],
    queryFn: () => getFoodRanking(),
  })
}