import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useGameById, useGetAvailableMoves, useMovePiece } from "../../hooks"
import Board from "./Board"

function Game() {

  const { gameId } = useParams()
  const [game, gameError, gameIsLoading, fetchGame] = useGameById(gameId)
  const { fetch: fetchMoves } = useGetAvailableMoves(gameId)
  const { fetch: movePiece } = useMovePiece(gameId)
  const [availableMoves, setAvailableMoves] = useState(null)
  const invertBoard = true

  useEffect(() => {console.log({game})}, [game])

  const squares = availableMoves?.board || game?.actualBoard?.squares

  const onSelectSquare = async (square) => {

    console.log(square)
    const [row, col] = square.coords
  
    if (square?.row === row && square?.col === col)
      return setAvailableMoves(null)

    if (square.isPossibleMove) {

      await movePiece({
        body: {
          from: availableMoves.positionContext.coords,
          to: square.coords
        }
      })
      await fetchGame()
      return setAvailableMoves(null)

    } else if (square.player === game?.actualPlayerTurn) {

      const data = await fetchMoves({ queryParams: { row, col } })
      return setAvailableMoves(data)

    }

    setAvailableMoves(null)

  }

  return (
    <section className="container py-3 mx-auto">
      <h1 className="text-3xl">Game {gameId}</h1>
      {(() => {
        if (gameError)
          return <p className="text-red-700">Error Fetching game...</p>
        if (gameIsLoading)
          return <p className="text-gray-500">Game is loading...</p>
        if (game && squares)
          return (
            <>
              <h2 className="text-xl">Player {game?.actualPlayerTurn} turn</h2>
              <Board {...{ squares, gameId, invertBoard, onSelectSquare }} />
            </>
          )
      })()}
      <Link to="../" className="text-blue-500 hover:text-blue-400">Go back</Link>
    </section>
  )
}


export default Game