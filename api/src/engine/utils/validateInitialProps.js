export function validateInitialPropsAndThrowError(...props) {
  for (const prop of props) {
    if (this.hasOwnProperty(prop))
      throw new ValidateInitialPropsError(`Prop ${prop} not found!`)
  }
}

class ValidateInitialPropsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidateInitialPropsError'
  }
}