import King from './King'
import Queen from './Queen'
import Rook from './Rook'
import Bishop from './Bishop'
import Knight from './Knight'
import Pawn from './Pawn'

function getPieceByNotation(notation) {
  if (notation === null || notation === undefined)
    return null
  notation = notation.toUpperCase()
  switch (notation) {
    case 'K': return King
    case 'Q': return Queen
    case 'R': return Rook
    case 'N': return Knight
    case 'B': return Bishop
    case '': return Pawn
  }
  throw new Error(`No chess piece with notation ${notation}!`)
}

export {
  King,
  Queen,
  Rook,
  Bishop,
  Knight,
  Pawn,
  getPieceByNotation
}