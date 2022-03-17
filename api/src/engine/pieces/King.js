import { Piece } from "./Piece"

const rules = [
  {
    type: 'moving',
    movingVertically: 1,
    movingHorizontally: 0,
    maxSquares: 1
  },
  {
    type: 'moving',
    movingVertically: 1,
    movingHorizontally: 1,
    maxSquares: 1
  },
  {
    type: 'special',
    name: 'castling'
  },
  {
    type: 'special',
    name: 'queenCastling'
  }
]

const King = new Piece('K', rules)
export default King 
