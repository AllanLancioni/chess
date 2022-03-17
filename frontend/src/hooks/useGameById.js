
import { useMemo } from "react"
import useApiResult from "./useApiResults"
import { getGameById } from "../apiRequests/gamesApi"

const useGameById = (id) => {
  const request = useMemo(() => getGameById(id), [id])
  const { data, error, isLoading, fetch } = useApiResult(request)
  return [data, error, isLoading, fetch]
}

export default useGameById