import mongoose from 'mongoose' 
const { model, Schema } = mongoose, { ObjectId } = Schema

export const GameScheme = new Schema({
  player1: ObjectId,
  player2: ObjectId,
  timeRemainingPlayer1: { type: Number, default: 10 * 60 * 1000 },
  timeRemainingPlayer2: { type: Number, default: 10 * 60 * 1000 },
  actualPlayerTurn: { type: Number, required: true, default: 1 },
  boardHistoric: [{ type: ObjectId, ref: 'Board', required: true }],
  actualBoard: { type: ObjectId, ref: 'Board', required: true }
})

export const GameModel = model('Game', GameScheme)

export default GameModel