import { createPositionContext } from './createPositionContext'

export const createBoard = loadedObject => Object.create({

  init() {

    Object.assign(this, {
      squares: null,
      ...(loadedObject || {})
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

  mapSquares(fn, squares = this.squares) {
    const board = createEmptyBoardSquares()
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        board[i][j] = fn(squares[i][j], [i, j], squares)
      }
    }
    return board
  }

})


export function createEmptyBoardSquares() {
  return Array(8).fill(null).map(() => Array(8).fill(null))
}
