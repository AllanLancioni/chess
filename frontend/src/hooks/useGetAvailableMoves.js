import { useMemo } from "react"
import useApiResult from "./useApiResults"
import { getAvailableMoves } from "../apiRequests/gamesApi"

const useGetAvailableMoves = (gameId) => {
  const request = useMemo(() => getAvailableMoves(gameId), [gameId])
  return useApiResult(request, { skipFirstRequest: true })
}

export default useGetAvailableMoves