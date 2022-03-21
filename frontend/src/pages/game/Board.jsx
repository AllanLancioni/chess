import Piece from "./Piece"

function Board({ squares, invertBoard, onSelectSquare }) {

  if (!squares)
    return null

  const squaresPlot = invertBoard ? [...squares].reverse().map(row => [...row]) : squares

  const getSquareClassNames = ({ coords: [row, col], isPossibleMove, isSelected, isPossibleCapture }) => {
    if (isSelected)
      return (col + row) % 2 === 0 ? 'bg-blue-500' : 'bg-blue-400'
    return `
      ${isPossibleMove ? 'possible-move ' : ''}
      ${isPossibleCapture ? 'possible-capture ' : ''}
      ${(col + row) % 2 === 0 ? 'bg-slate-400' : 'bg-slate-600'}
    `
  }

  return (
    <section className="flex flex-col items-center justify-center my-4">
      <div className="drop-shadow-xl overflow-hidden rounded-sm">
        {squaresPlot.map((row, rowIndex) => (
          <div
            className="flex flex-row"
            key={'row--' + rowIndex}
          >
            {row.map((square, colIndex) => (
              <div
                key={'col--' + colIndex}
                className={`flex items-center justify-center ${getSquareClassNames(square)}`}
                style={{ width: '3rem', height: '3rem' }}
                onClick={() => onSelectSquare(square)}
              >
                <Piece {...square} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Board

