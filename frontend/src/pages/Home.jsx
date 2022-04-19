import axios from '../config/axios'
import { Link, useNavigate } from "react-router-dom"
import { useGames } from '../hooks'

function Home() {
  const [gamesData, gamesError, gamesIsLoading] = useGames()
  const navigate = useNavigate()

  const createNewGame = async () => {
    const { data } = await axios.post('/game')
    navigate('game/' + data._id)
  }

  return (
    <section className="container mx-auto">
      <h1 className="text-3xl">Games</h1>
      <div className="my-4">
        {(() => {
          if (gamesIsLoading)
            return <p className="text-gray-500">Loading...</p>
          if (gamesError)
            return <p className="text-red-700">Failed fetch games</p>
          return (
            gamesData?.data?.map(game => (
              <div key={game._id} className="text-slate-600 hover:text-slate-700">
                <Link to={'game/' + game._id}>Game: {game._id}</Link>
              </div>
            ))
          )
        })()}
      </div>

      <button
        onClick={() => createNewGame()}
        className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
      >
        New Game
      </button>
    </section>
  )
}

export default Home