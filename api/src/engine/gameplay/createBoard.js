import { createMovingPreparationContext } from './createMovingPreparationContext'
import { createPositionContext } from './createPositionContext'

export function createBoard(loadedObject) {
  return Object.create(Board, {
    _loadedObject: { value: loadedObject }
  })
}

export var Board = {

  init() {

    Object.assign(this, {
      squares: null,
      capturedPiecesPlayer1: [],
      capturedPiecesPlayer2: [],
      isInCheckPlayer1: true,
      isInCheckPlayer2: true,
      ...(this._loadedObject || {})
    })

    if (!this.squares) {
      this.squares = createEmptyBoardSquares()
      this.squares[0] = this.squares[7] = ['R', 'N', 'B', 'K', 'Q', 'B', 'N', 'R']
      this.squares[1] = this.squares[6] = Array(8).fill('')

      this.squares = this.mapSquares((square, coords) => createPositionContext({
        player: square !== null ? (coords[0] < 5 ? 1 : 2) : null,
        pieceNotation: square,
        movesCount: 0
      }).init(coords))
    }

    return this
  },

  forEachSquare(fn, squares = this.squares) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        fn(squares[i][j], [i, j], squares)
      }
    }
  },

  get(row, col) {
    if (row instanceof Array && col === undefined)
      [row, col] = row
    return (this.squares[row] && this.squares[row][col]) || null
  },

  mapSquares(fn, squares = this.squares) {
    const boardSquares = createEmptyBoardSquares()
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        boardSquares[i][j] = fn(squares[i][j], [i, j], squares)
      }
    }
    return boardSquares
  },

  move(originPosCtx, targetPosCtx) {
    
    this.updateOnBoard(targetPosCtx.updatePosition(originPosCtx))
    this.updateOnBoard(originPosCtx.cleanPosition())
    if (targetPosCtx.hasCaptured)
      this[`capturedPiecesPlayer${targetPosCtx.player}`].push(targetPosCtx.piece.notation)
    return this
  },

  updateOnBoard(posCtx) {
    const [row, col] = posCtx.coords
    this.squares[row][col] = posCtx
    return this
  },

  isKingInCheck(actualPlayerTurn) {
    let king, actualInCheck = false
    const enemies = [], isInCheckProp = `isInCheckPlayer${actualPlayerTurn}`
    for (const square of this.squares.flat().filter(square => square.player)) {
      if (square.player !== actualPlayerTurn)
        enemies.push(square)
      else if (square.pieceNotation === 'K')
        king = square
    }

    for(let enemy of enemies) {
      enemy.possibleSquares = createMovingPreparationContext()
        .init(this, ...enemy.coords)
        .getNormalRulesMoves()
        .possibleSquares
      if (enemy.possibleSquares.some(square => square.position === king.position)) {
        actualInCheck = true
        break
      }
    }
    this[isInCheckProp] = actualInCheck
    return this[isInCheckProp]
  },

  toJSON() {
    return {
      ...this,
      squares: this.toSquaresJSON()
    }
  },

  toSquaresJSON() {
    return this.mapSquares(square => {
      return { ...square, piece: undefined }
    })
  }



}

export function createEmptyBoardSquares() {
  return Array(8).fill(null).map(() => Array(8).fill(null))
}
