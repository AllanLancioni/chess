import { getPieceByNotation } from "../pieces"
import { isPrototypeOf } from "../utils/isPrototypeOf"
import { convertCoordsToPosition } from "../utils/convertPositionsCoords"
import { Board } from './createBoard'

export function createPositionContext(boardSquaresOrConfig) {
  return Object.create(PositionContext, {
    _boardSquaresOrConfig: { value: boardSquaresOrConfig }
  })
}

var PositionContext = {

  init(coords) {
    if (!(coords instanceof Array))
      return null

    const position =  isPrototypeOf(this._boardSquaresOrConfig, Board) 
      ? this._boardSquaresOrConfig.get(coords) 
      : this._boardSquaresOrConfig

    return Object.assign(this, {
      coords,
      player: position?.player || null,
      movesCount: position?.movesCount ?? null,
      pieceNotation: position?.pieceNotation,
      piece: getPieceByNotation(position?.pieceNotation),
      position: convertCoordsToPosition(coords),
    })
  },

  updatePosition(movedPositionContext) {
    if (!movedPositionContext?.piece && !this.isValidBoardPosition(movedPositionContext))
      throw new Error(`Got invalid board position context at ${this.coords}!`)
    const { piece, player, movesCount, pieceNotation } = movedPositionContext
    if (player === this.player)
      throw new Error(`Player ${player} can not capture own piece at ${this.coords}!`)

    return createPositionContext({
      ...this,
      player,
      piece,
      pieceNotation,
      movesCount: movesCount + 1,
      hasCaptured: this.piece?.notation ?? null
    }).init(this.coords).checkForPromotion()
  },

  checkForPromotion() {
    if (this.pieceNotation !== '' || !this.player)
      return this
    if (
      (this.player === 1 && this.coords[0] === 7) ||
      (this.player === 2 && this.coords[0] === 0)
    ) {
      this.piece = getPieceByNotation('Q')
      this.pieceNotation = this.piece.notation
    }
    return this
  },

  cleanPosition() {
    if (!this.piece)
      throw new Error(`Can not move a piece if it not exists at ${this.coords}!`)

    return createPositionContext({
      ...this,
      player: null,
      piece: null,
      pieceNotation: null,
      movesCount: null,
      hasCaptured: undefined
    }).init(this.coords)

  },

  isValidBoardPosition(boardPosition) {
    return typeof boardPosition === 'object' && boardPosition.__proto === this._proto__
  }

}