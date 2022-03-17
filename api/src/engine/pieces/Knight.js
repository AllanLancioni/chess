import { Piece } from "./Piece"

const rules = [
  {
    type: 'moving',
    movingVertically: 2,
    movingHorizontally: 1,
    maxSquares: 1,
    specialRules: [
      'jumpOver'
    ] 
  }
]

const Knight = new Piece('N', rules)
export default Knight 
