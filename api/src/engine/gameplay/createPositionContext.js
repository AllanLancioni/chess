import { getPieceByNotation } from "../pieces"
import { convertCoordsToPosition } from "../utils/positions-coords"

export const createPositionContext = boardSquaresOrPosition => Object.create({

  init(coords) {
    if (!(coords instanceof Array))
      return null

    const boardPosition = boardSquaresOrPosition instanceof Array
      ? boardSquaresOrPosition[coords[0]][coords[1]]
      : boardSquaresOrPosition

    return Object.assign(this, {
      coords,
      player: boardPosition?.player || null,
      movesCount: boardPosition?.movesCount ?? null,
      pieceNotation: boardPosition?.pieceNotation,
      piece: getPieceByNotation(boardPosition?.pieceNotation),
      position: convertCoordsToPosition(coords),
    })
  },

  updatePosition(movedPositionContext) {
    if (!movedPositionContext?.piece && !this.isValidBoardPosition(movedPositionContext))
      throw new Error(`Got invalid board position context at ${this.coords}!`)
    const { piece, player, movesCount } = movedPositionContext
    if (player === this.player)
      throw new Error(`Player ${player} can not capture own piece at ${this.coords}!`)

    Object.assign(this, {
      player,
      piece,
      pieceNotation: piece.notation,
      movesCount: movesCount + 1,
      hasCaptured: this.piece?.notation ?? null
    })
    return this
  },

  cleanPosition() {
    if (!this.piece)
      throw new Error(`Can not move a piece if it not exists at ${this.coords}!`)
    Object.assign(this, {
      player: null,
      piece: null,
      pieceNotation: null,
      movesCount: null,
      hasCaptured: undefined
    })
    return this
  },

  isValidBoardPosition(boardPosition) {
    return typeof boardPosition === 'object' && boardPosition.__proto === this._proto__
  }

})
