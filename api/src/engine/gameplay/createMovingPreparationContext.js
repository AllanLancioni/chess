import { createMoveContext } from './createMoveContext'
import { createPositionContext } from './createPositionContext'

export const createMovingPreparationContext = () => Object.create({

  init(board, rowOrigin, colOrigin) {
    if (!board[rowOrigin] || board[rowOrigin][colOrigin]?.pieceNotation === null)
      throw new Error('Pass a valid position!')

    return Object.assign(this, {
      possibleSquares: [],
      positionContext: createPositionContext(board).init([rowOrigin, colOrigin]),
      board,
    })
  },

  moveTo(rowTarget, colTarget) {

    const targetSquare = this
      .getNormalRulesMoves()
      .possibleSquares
      .find(({ coords: [row, col] }) => row === rowTarget && col === colTarget)

    if (!targetSquare)
      throw new Error(`Cannot move to the desired position ${rowTarget}, ${colTarget}!`)

    return createMoveContext()
      .init({
        board: this.board,
        originPosCtx: this.positionContext,
        targetPosCtx: createPositionContext(this.board).init([rowTarget, colTarget]),
      })
      .move()
  },

  getNormalRulesMoves() {
    const
      normalRules = this.positionContext.piece.movingRules.filter(rule => rule.type === 'moving'),
      addToPossible = this.addUniquePositionContextToTarget(this.possibleSquares)
    for (const rule of normalRules) {
      if (rule.specialRules?.includes('firstMove') && this.positionContext.movesCount > 0)
        continue
      // Multiplying player 'piece.movingVertically' by -1 if its a black piece
      const extendsMoves = this.getExtendedMovesByRelativeCoords(rule)
      const row = rule.movingVertically * (this.positionContext.player === 1 ? 1 : -1)
      addToPossible(
        ...extendsMoves(row, rule.movingHorizontally),
        ...extendsMoves(row, -rule.movingHorizontally),
      )
      if (!rule.specialRules?.includes('onlyForwards'))
        addToPossible(
          ...extendsMoves(rule.movingHorizontally, row),
          ...extendsMoves(rule.movingHorizontally, -row),
          ...extendsMoves(-row, rule.movingHorizontally),
          ...extendsMoves(-row, -rule.movingHorizontally),
          ...extendsMoves(-rule.movingHorizontally, row),
          ...extendsMoves(-rule.movingHorizontally, -row)
        )
    }
    return this
  },

  updateBoardWithSelectWithPossibleSquares() {

    for (const { coords: [row, col] } of this.possibleSquares) {
      // TODO: replace (this.board[row, col] || {}) when update BoardSchema
      this.board[row][col] = { ...(this.board[row][col] || {}), isPossibleMove: true }
    }
    return this
  },

  addUniquePositionContextToTarget(targetPositionCtxArray) {
    return (...coordsPairs) => {
      for (const coords of coordsPairs.filter(coordsPair => coordsPair instanceof Array)) {
        if (targetPositionCtxArray.every(ctx => ctx.coords.toString() !== coords.toString()))
          targetPositionCtxArray.push(createPositionContext(this.board).init(coords))
      }
    }
  },

  getMovesByRelativeCoords(relativeRow, relativeCol) {
    const
      [rowOrigin, colOrigin] = this.positionContext.coords,
      newRow = rowOrigin + relativeRow,
      newCol = colOrigin + relativeCol

    if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7)
      return null

    return [newRow, newCol]
  },

  getExtendedMovesByRelativeCoords(rule) {
    return (relativeRow, relativeCol) => {
      const squaresToAdd = []
      let square, row = relativeRow, col = relativeCol
      
      for (let i = 1; i <= rule.maxSquares; i++) {
        row = relativeRow * i
        col = relativeCol * i
        square = this.getMovesByRelativeCoords(row, col)
        const targetPositionContext = createPositionContext(this.board).init(square)
        if (targetPositionContext?.player === this.positionContext.player) {
          if (this.positionContext.piece.rule?.specialRules?.includes('jumpOver'))
            continue
          else
            break
        }
        if (!this.checkCaptureRules(rule, targetPositionContext))
          continue
        if (!square) break
        squaresToAdd.push(square)
        if (targetPositionContext.piece) break
      }

      return squaresToAdd
    }
  },

  checkCaptureRules(rule, targetPosCtx) {
    if (!targetPosCtx)
      return true
    if (rule?.specialRules?.includes('onlyWithNoCapture'))
      return !targetPosCtx.piece
    if (rule?.specialRules?.includes('onlyWithCapture'))
      return !!targetPosCtx.piece
    return true
  }
})
