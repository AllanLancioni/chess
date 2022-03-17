import { Piece } from "./Piece"

const rules = [
  {
    type: 'moving',
    movingVertically: 1,
    movingHorizontally: 0,
    maxSquares: 1,
    specialRules: [
      'onlyForwards',
      'onlyWithNoCapture'
    ]
  },
  {
    type: 'moving',
    movingVertically: 1,
    movingHorizontally: 0,
    maxSquares: 2,
    specialRules: [
      'onlyForwards',
      'onlyWithNoCapture',
      'firstMove'
    ]
  },
  {
    type: 'moving',
    movingVertically: 1,
    movingHorizontally: 1,
    maxSquares: 1, 
    specialRules: [
      'onlyForwards',
      'onlyWithCapture',  
    ]
  },
  {
    type: 'special',
    name: 'enPassant'
  }
]

const Pawn = new Piece('', rules)
export default Pawn 
