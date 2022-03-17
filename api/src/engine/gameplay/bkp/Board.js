/**
 * The Chess Board
 * @constructor
 */
export default function Board(squares) {

  /** 
   * @prop squares - Squares is a matrix that represents the board
   * Square represents a null object if its empty or a struct with the owner player and piece { player: 1 | 2, piece: Piece }
   */
  this.squares = squares || this.getInitialBoard()

  /** Pieces captured of both players */
  this.player1Out = []
  this.player2Out = []
}

/**
 * Get board with all squares nulled
 * @returns new nulled board
 */
Board.prototype.getEmptyBoard = function () {
  return Array(8).fill(null).map(() => Array(8).fill(null))
}


/**
 * Get board with all pieces organized like initial of a chess game
 * @returns new board
 */
Board.prototype.getInitialBoard = function () {
  const board = this.getEmptyBoard()
  board[0] = board[7] = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  board[1] = board[6] = Array(8).fill('')
  return this.mapBoard((square, { i, j }) => {
    if (square === null) return null
    return {
      player: i < 5 ? 1 : 2,
      piece: square,
      movesCount: 0
    }
  }, board)
}

/**
 * Function like an Array.forEach that iterates over the board matrix
 * @param {string} fn - The iterator function
 * @param {string} squares - The board matrix @default this.squares own board matrix
 */
Board.prototype.forEachSquare = function (fn, squares = this.squares) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      fn(squares[i][j], { i, j }, squares)
    }
  }
}

/**
 * Function like an Array.map that iterates over the board matrix
 * @param {string} fn - The iterator function
 * @param {string} squares - The board matrix @default this.squares own board matrix
 * @returns new board
 */
Board.prototype.mapBoard = function (fn, squares = this.squares) {
  const board = this.getEmptyBoard()
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board[i][j] = fn(squares[i][j], { i, j }, squares)
    }
  }
  return board
}