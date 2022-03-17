import { getPieceByNotation } from "../../shared/functions/getPieces"

function Piece({ pieceNotation, player }) {

  return (
    <span className={'text-3xl ' + (+player === 1 ? 'text-stone-100' : 'text-stone-800')}
      style={{ textShadow: '1px 2px 2px rgba(50,50,50,.75)', cursor: 'pointer' }}>
      {getPieceByNotation(pieceNotation)}
    </span>
  )
}

export default Piece