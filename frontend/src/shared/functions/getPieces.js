export const PIECES_CODE = {
  king: 9818,
  queen: 9819,
  rook: 9820,
  bishop: 9821,
  knight: 9822,
  pawn: 9823,
}

export function getPieceByNotation(piece) {

  const getByStr = (str) => String.fromCharCode(PIECES_CODE[str])

  switch (piece) {
    case 'K':
      return getByStr('king')
    case 'Q':
      return getByStr('queen')
    case 'R':
      return getByStr('rook')
    case 'B':
      return getByStr('bishop')
    case 'N':
      return getByStr('knight')
    case '':
      return getByStr('pawn')
    default:
      return null
  }
}