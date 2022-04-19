export const CODE_1 = 49, CODE_8 = 56, CODE_A = 97, CODE_H = 104

export function isValidPosition(position) {
  return position?.length === 2
    && position.charCodeAt(0) >= CODE_A
    && position.charCodeAt(0) <= CODE_H
    && position.charCodeAt(1) >= CODE_1
    && position.charCodeAt(1) <= CODE_8
}

export function isValidCoords(row, col) {
  return !Number.isNaN(row)
    && !Number.isNaN(col)
    && row >= 0
    && row <= 7
    && col >= 0
    && col <= 7
}

export function convertPositionToCoords(position) {
  if (!isValidPosition(position))
    throw new Error('Pass a valid position!')
  return [position.charCodeAt(1) % CODE_1, position.charCodeAt(0) % CODE_A]
}

export function convertCoordsToPosition([row, col]) {
  if (!isValidCoords(row, col))
    throw new Error('Pass a valid coords!')
  return String.fromCharCode(col + CODE_A) + String.fromCharCode(row + CODE_1)
}
