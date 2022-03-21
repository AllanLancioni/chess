
import toJSONDeep from '../utils/toJSONDeep'
import { createBoard } from './createBoard'
import { createMovingPreparationContext } from './createMovingPreparationContext'

export function createGame(loadedObject) {
  return Object.create(Game, { _loadedObject: { value: loadedObject } })
}

export var Game = {

  init() {

    const timeInMinutes = this._loadedObject?.timeInMinutes || 10

    return Object.assign(this, {
      player1: null,
      player2: null,
      timeRemainingPlayer1: timeInMinutes * 60 * 1000,
      timeRemainingPlayer2: timeInMinutes * 60 * 1000,
      actualPlayerTurn: 1,
      boardHistoric: [],
      status: null,
      ...(this._loadedObject || {}),
      actualBoard: createBoard(this._loadedObject?.actualBoard).init(),
    })

  },

  getAvailableMoves(rowOrigin, colOrigin) {
    if (this.actualBoard.get(rowOrigin, colOrigin)?.player !== this.actualPlayerTurn)
      throw new Error('Not player turn!')
    if (this.status !== null)
      throw new Error('Can\'t get available moves of a finished game!')
    const movingPreparationContext = createMovingPreparationContext()
      .init(this.actualBoard, rowOrigin, colOrigin)
      .getNormalRulesMoves()
      .revalidateMoves()
      .updateBoardWithSelectWithPossibleSquares()
      .toJSON()
    return movingPreparationContext
  },

  verifyCheckMate(player) {

    const squares = this.actualBoard.squares.flat().filter(square => square.player)
    if (squares.length === 2 && squares.every(({ pieceNotation }) => pieceNotation === 'K')) {
      this.status = 'DRAW'
      return
    }

    let hasAvailableMoves
    const playerPieces = squares.filter(square => square.player === player)
    for (const { coords } of playerPieces) {
      const { possibleSquares } = createMovingPreparationContext()
        .init(this.actualBoard, ...coords)
        .getNormalRulesMoves()
        .revalidateMoves()
      if (possibleSquares.length) {
        hasAvailableMoves = true
        break
      }
    }
    if (!hasAvailableMoves) {
      const winner = player === 1 ? 2 : 1
      this.status = this.actualBoard[`isInCheckPlayer${player}`] ? `PLAYER${winner}_WINS` : 'DRAW'
    }
    return this
  },

  makeAMove(coordsOrigin, coordsTarget) {
    if (this.actualBoard.get(coordsOrigin)?.player !== this.actualPlayerTurn)
      throw new Error('Not player turn!')

    createMovingPreparationContext()
      .init(this.actualBoard, ...coordsOrigin)
      .moveTo(...coordsTarget)

    this.actualPlayerTurn = (this.actualPlayerTurn % 2) + 1
    this.actualBoard.isKingInCheck(this.actualPlayerTurn)
    this.verifyCheckMate(this.actualPlayerTurn)

    return this
  },

  toJSON() {
    return toJSONDeep.call(this)
  },

}