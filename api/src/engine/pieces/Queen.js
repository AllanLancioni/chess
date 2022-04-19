import { Piece } from "./Piece"

const rules = [
  {
    type: 'moving',
    movingVertically: 1,
    movingHorizontally: 0,
    maxSquares: Infinity 
  },
  {
    type: 'moving',
    movingVertically: 1,
    movingHorizontally: 1,
    maxSquares: Infinity
  },
]

const Queen = new Piece('Q', rules)
export default Queen 
