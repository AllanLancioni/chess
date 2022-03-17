
import { useMemo } from "react"
import useApiResult from "./useApiResults"
import { getGames } from "../apiRequests/gamesApi"

const useGames = () => {
  const request = useMemo(() => getGames(), [])
  const { data, error, isLoading, fetch } = useApiResult(request)
  return [data, error, isLoading, fetch]
}

export default useGames