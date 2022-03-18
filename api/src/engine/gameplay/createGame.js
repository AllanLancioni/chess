
import toJSONDeep from '../utils/toJSONDeep'
import { createBoard } from './createBoard'
import { createMovingPreparationContext } from './createMovingPreparationContext'

export function createGame(loadedObject) {
  return Object.create(Game, {_loadedObject: { value: loadedObject }})
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
      ...(this._loadedObject || {}),
      actualBoard: createBoard(this._loadedObject?.actualBoard).init(),
    })

  },

  getAvailableMoves(rowOrigin, colOrigin) {
    if (this.actualBoard.get(rowOrigin, colOrigin)?.player !== this.actualPlayerTurn)
      throw new Error('Not player turn!')
    const movingPreparationContext = createMovingPreparationContext()
      .init(this.actualBoard, rowOrigin, colOrigin)
      .getNormalRulesMoves()
      .revalidateMoves()
      .updateBoardWithSelectWithPossibleSquares()
      .toJSON()
    return movingPreparationContext
  },

  makeAMove(coordsOrigin, coordsTarget) {
    if (this.actualBoard.get(coordsOrigin)?.player !== this.actualPlayerTurn)
      throw new Error('Not player turn!')

    createMovingPreparationContext()
      .init(this.actualBoard, ...coordsOrigin)
      .moveTo(...coordsTarget)

    this.actualPlayerTurn = (this.actualPlayerTurn % 2) + 1

    return this
  },

  toJSON() {
    return toJSONDeep.call(this)
  },

}