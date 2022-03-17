'use strict'

/** Module dependencies */
import { GameModel, BoardModel } from '../../models'
import { createGame } from '../../engine/gameplay/createGame'
import { convertPositionToCoords, isValidPosition } from '../../engine/utils/positions-coords'

export default {

  /** @method list - List Game */
  async list(req, res, next) {
    try {
      const data = await GameModel.find({})
      const count = data.length
      res.json({ data, count })
    } catch (error) {
      next(error)
    }
  },

  /** @method create - Creates a Game */
  async create(req, res, next) {
    try {
      const game = createGame({ timeInMinutes: 10 }).init()
      const respBoard = await BoardModel.create(game.actualBoard)
      game.boardHistoric.push(respBoard._id)
      game.actualBoard = respBoard._id
      const respGame = await GameModel.create(game)
      res.status(201).json({ ...respGame.toJSON(), actualBoard: respBoard })
    } catch (error) {
      next(error)
    }

  },

  /** @method GetById - returns a game with board */
  async getById({ params }, res, next) {
    try {
      const respGame = await GameModel.findById(params.id).populate('actualBoard')
      if (!respGame)
        return res.status(404).json({ status: 404, message: 'Not Found' })
      const game = createGame(respGame.toJSON()).init()
      res.json(game)
    } catch (error) {
      next(error)
    }
  },


  /** @method GetAvailableMoves - receive row and col or position by queryParams and returns array of available positions */
  async getAvailableMoves({ params, query }, res, next) {
    try {
      let row, col
      console.log(query);
      if (query.position)
        [row, col] = convertPositionToCoords(query.position)
      else
        row = +query.row, col = +query.col
      if (Number.isNaN(row) || Number.isNaN(col))
        return res.status(400).json({ status: 404, message: 'Pass a valid Coords or Position' })

      const respGame = await GameModel.findById(params.id).populate('actualBoard')
      if (!respGame)
        return res.status(404).json({ status: 404, message: 'Not Found' })
      try {
        const moves = createGame(respGame.toJSON()).init().getAvailableMoves(row, col)
        res.json(moves)
      } catch (error) {
        console.error(error);
        res.status(400).json({ status: 400, error: error.message })
      }
    } catch (error) {
      next(error)
    }

  },

  /** @method Move - receive 'from' and 'to' coords pair array and return the game object structure */
  async makeAMove({ params, body: { from, to } }, res, next) {
    const validation = [from, to].every(c =>
      c?.length === 2 &&
      c.every(coord => typeof coord === 'number' && coord >= 0 && coord < 8)
    )

    if (!validation)
      return res.status(400).json({ status: 400, message: 'Invalid from-to params' })
    const respGame = await GameModel.findById(params.id).populate('actualBoard')
    if (!respGame)
      return res.status(404).json({ status: 404, message: 'Not Found' })

    const game = createGame(respGame.toJSON()).init()
    
    try {
      const squares = game.makeAMove(from, to)
      delete game.actualBoard._id
      const respBoard = await BoardModel.create({ ...game.actualBoard, squares })
      game.boardHistoric.push(respBoard._id)
      await GameModel.findByIdAndUpdate(
        respGame._id,
        { $set: { ...game, actualBoard: respBoard._id } },
        { new: true }
      )

      res.json(game)
    } catch (error) {
      console.error(error)
      res.status(400).json({ status: 400, error: error.message })
    }
  }

}