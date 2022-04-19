import { Piece } from "./Piece"

const rules = [
  {
    type: 'moving',
    movingVertically: 1,
    movingHorizontally: 1,
    maxSquares: Infinity
  },
]

const Bishop = new Piece('B', rules)
export default Bishop 
