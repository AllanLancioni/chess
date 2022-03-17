import cloneDeep from 'clone-deep'
import { createPositionContext } from './createPositionContext'

export const createMoveContext = () => Object.create({

  init({ board, originPosCtx, targetPosCtx }) {

    const newBoard = cloneDeep(board)

    return Object.assign(this, {
      board: newBoard,
      originPosCtx: createPositionContext(newBoard).init(originPosCtx.coords),
      targetPosCtx: createPositionContext(newBoard).init(targetPosCtx.coords),
      capturedPiece: null
    })
  },

  move() {
    this.updateOnBoard(this.targetPosCtx.updatePosition(this.originPosCtx))
    this.updateOnBoard(this.originPosCtx.cleanPosition())
    this.capturedPiece = this.targetPosCtx.hasCaptured
    return this
  },

  updateOnBoard({ player, piece, movesCount, coords: [row, col] }) {
    Object.assign(this.board[row][col], {
      player,
      piece,
      movesCount: movesCount,
      pieceNotation: piece?.notation ?? null,
    })
    return this
  },
})