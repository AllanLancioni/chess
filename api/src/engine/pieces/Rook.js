import { Piece } from "./Piece"

const rules = [
  {
    type: 'moving',
    movingVertically: 1,
    movingHorizontally: 0,
    maxSquares: Infinity
  },
]

const Rook = new Piece('R', rules)
export default Rook 
