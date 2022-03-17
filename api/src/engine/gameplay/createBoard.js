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
      capturedPieces: [],
      ...(this._loadedObject || {})
    })

    if (!this.squares) {
      this.squares = createEmptyBoardSquares()
      this.squares[0] = this.squares[7] = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
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
    const board = createEmptyBoardSquares()
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        board[i][j] = fn(squares[i][j], [i, j], squares)
      }
    }
    return board
  },

  move(originPosCtx, targetPosCtx) {

    // const newBoard = createBoard({ squares: board.toJSON() }).init()


    this.updateOnBoard(targetPosCtx.updatePosition(originPosCtx))
    this.updateOnBoard(originPosCtx.cleanPosition())
    if (targetPosCtx.hasCaptured) {
      this.capturedPieces.push({
        pieceNotation: targetPosCtx.piece.notation,
        player: targetPosCtx.player
      })
    }
    return this
  },

  updateOnBoard({ player, piece, movesCount, coords }) {
    Object.assign(this.get(coords), {
      player,
      piece,
      movesCount,
      pieceNotation: piece?.notation ?? null,
    })
    return this
  },


  toJSON() {
    return this.mapSquares((square, coords) => {
      return { ...square, piece: undefined }
    })
  }

}

export function createEmptyBoardSquares() {
  return Array(8).fill(null).map(() => Array(8).fill(null))
}
