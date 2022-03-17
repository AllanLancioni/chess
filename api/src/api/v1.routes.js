import { Router } from 'express'
import controllers from './controllers'

var gameRoutes = Router()
  .post('/', controllers.game.create)
  .get('/', controllers.game.list)
  .get('/:id', controllers.game.getById)
  .get('/:id/available-moves', controllers.game.getAvailableMoves)
  .put('/:id/move', controllers.game.makeAMove)

var routes = Router()
  .get('/', (req, res) => res.json({ data: 'Hello World (from router)!' }))
  .use('/game', gameRoutes)


export default routes