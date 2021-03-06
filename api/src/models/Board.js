import mongoose from 'mongoose'
const { model, Schema } = mongoose

const SquareSchema = new Schema({
  pieceNotation: { type: String, enum: ['', 'K', 'Q', 'R', 'N', 'B'], default: null },
  player: { type: Number, enum: [1, 2] },
  movesCount: { type: Number, default: 0 },
  coords: { type: [Number], required: true },
  position: { type: String, required: true },
}, { _id: false })

export const BoardScheme = new Schema({
  squares: [[SquareSchema]],
  capturedPiecesPlayer1: [String],
  capturedPiecesPlayer2: [String],
  isInCheckPlayer1: { type: Boolean, default: false },
  isInCheckPlayer2: { type: Boolean, default: false },
})

export const BoardModel = model('Board', BoardScheme)

export default BoardModel