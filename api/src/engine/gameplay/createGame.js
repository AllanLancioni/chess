
import { createBoard } from './createBoard'
import { createMovingPreparationContext } from './createMovingPreparationContext'

export const createGame = loadedObject => Object.create({

  init() {

    const timeInMinutes = loadedObject?.timeInMinutes || 10

    return Object.assign(this, {
      player1: null,
      player2: null,
      timeRemainingPlayer1: timeInMinutes * 60 * 1000,
      timeRemainingPlayer2: timeInMinutes * 60 * 1000,
      actualPlayerTurn: 1,
      boardHistoric: [],
      actualBoard: createBoard(loadedObject?.actualBoard).init(),
      ...(loadedObject || {})
    })

  },

  getAvailableMoves(rowOrigin, colOrigin) {
    if (this.actualBoard.squares[rowOrigin][colOrigin].player !== this.actualPlayerTurn)
      throw new Error('Not player turn!')
    const movingPreparationContext = createMovingPreparationContext()
      .init(this.actualBoard.squares, rowOrigin, colOrigin)
      .getNormalRulesMoves()
      .updateBoardWithSelectWithPossibleSquares()
    return movingPreparationContext
  },

  makeAMove(coordsOrigin, coordsTarget) {
    if (this.actualBoard.squares[coordsOrigin[0]][coordsOrigin[1]].player !== this.actualPlayerTurn)
      throw new Error('Not player turn!')

    const { board } = createMovingPreparationContext()
      .init(this.actualBoard.squares, ...coordsOrigin)
      .moveTo(...coordsTarget)

    this.actualBoard.squares = board
    this.actualPlayerTurn = (this.actualPlayerTurn % 2) + 1

    return board


  }

})
