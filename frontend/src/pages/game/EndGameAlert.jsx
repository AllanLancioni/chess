import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function EndGameAlert({ gameStatus }) {

  const [visible, setVisible] = useState()
  useEffect(() => { setVisible(!!gameStatus) }, [gameStatus])

  if (!visible)
    return null

  return (
    <section className="
      alert-endgame
      drop-shadow-md 
      rounded-md
      p-4
      bg-slate-300
      border-2
      border-slate-400
    ">
      <h2 className="text-3xl">End Game! </h2>
      <h3 className="text-2xl mt-3 mb-4">{(() => {
        if (gameStatus === 'PLAYER1_WINS')
          return 'Player 1 wins!'
        if (gameStatus === 'PLAYER2_WINS')
          return 'Player 2 wins!'
        return 'DRAW!'
      })()
      }</h3>
      <div>
        <Link className="text-slate-600" to='/'>Return to mainscreen</Link>
        <span className="mx-2">|</span>
        <button className="text-slate-600" onClick={() => setVisible(false)}>
          Hide modal
        </button>
      </div>
    </section>
  )
}

export default EndGameAlert