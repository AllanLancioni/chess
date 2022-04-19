import { getPieceByNotation } from "../../shared/functions/getPieces"

function Piece({ pieceNotation, player }) {

  return (
    <span className={'piece text-3xl ' + (+player === 1 ? 'text-stone-100' : 'text-stone-800')}>
      {getPieceByNotation(pieceNotation)}
    </span>
  )
}

export default Piece