// PATTERN PROTOTYPE INHERITANCE

import { createMovingPreparationContext } from "../createMovingPreparationContext"
import { createBoard } from "../createBoard"

export default function Game({ player1 = null, player2 = null, timeInMinutes = 10 } = {}) {
  this.player1 = player1
  this.player2 = player2
  this.timeRemainingPlayer1 = timeInMinutes * 60 * 1000
  this.timeRemainingPlayer2 = timeInMinutes * 60 * 1000
  this.actualPlayerTurn = 1
  this.boardHistoric = []
  this.actualBoard = createBoard().init()
}

/** Static factory method Load */
Game.load = function (game) {
  const gameToLoad = new Game()
  Object.assign(gameToLoad, game)
  this.actualBoard = createBoard(game?.actualBoard?.squares).init()
  return gameToLoad
}

Game.prototype.getAvailableMoves = function (rowOrigin, colOrigin) {
  this.actualBoard.squares[rowOrigin][colOrigin]
  if (this.actualBoard.squares[rowOrigin][colOrigin].player !== this.actualPlayerTurn)
    throw new Error('Not player turn!')

  const { possibleSquares, board } = createMovingPreparationContext()
    .init(this.actualBoard.squares, rowOrigin, colOrigin)
    .getNormalRulesMoves()
    .updateBoardWithSelectWithPossibleSquares()
  return { possibleSquares, board }
}

Game.prototype.makeAMove = function (coordsOrigin, coordsTarget) {
  if (this.actualBoard.squares[coordsOrigin[0]][coordsOrigin[1]].player !== this.actualPlayerTurn)
    throw new Error('Not player turn!')

  const { board } = createMovingPreparationContext()
    .init(this.actualBoard.squares, ...coordsOrigin)
    .moveTo(...coordsTarget)
  // this.actualBoard.squares = board.map(row => row.map(col => {
  //   return col ? { ...col, piece: piece.notation } : null
  // }))

  this.actualBoard.squares = board
  this.actualPlayerTurn = (this.actualPlayerTurn % 2) + 1

  return board


}
