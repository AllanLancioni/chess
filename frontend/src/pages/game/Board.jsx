import Piece from "./Piece"

function Board({ squares, invertBoard, onSelectSquare }) {

  if (!squares)
    return null

  const squaresPlot = invertBoard ? [...squares].reverse().map(row => [...row].reverse()) : squares

  const getSquareColor = ({coords: [row, col], isPossibleMove}) => {
    if (isPossibleMove)
      return 'bg-green-400'
    return ((col + row) % 2 === 0 ? 'bg-slate-600' : 'bg-slate-400')
  }

  return (
    <section className="flex flex-col">
      {squaresPlot.map((row, rowIndex) => (
        <div
          className="flex flex-row"
          key={'row--' + rowIndex}
        >
          {row.map((square, colIndex) => (
            <div
              key={'col--' + colIndex}
              className={'flex items-center justify-center ' + getSquareColor(square)}
              style={{ width: '3rem', height: '3rem' }}
              onClick={() => onSelectSquare(square)}
            >
              <Piece {...square} />
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

export default Board

