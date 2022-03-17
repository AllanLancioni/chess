import { useMemo } from "react"
import useApiResult from "./useApiResults"
import { movePiece } from "../apiRequests/gamesApi"

const useMovePiece = (gameId) => {
  const request = useMemo(() => movePiece(gameId), [gameId])
  return useApiResult(request, { skipFirstRequest: true })
}

export default useMovePiece