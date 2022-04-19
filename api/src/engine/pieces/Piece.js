export function Piece(notation, rules = []) {
  this.notation = notation
  // this.position = { x: null, y: null, description: null }
  // this.wasCaptures = false
  this.movingRules = rules
}

