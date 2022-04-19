export default function toJSONDeep() {

  const json = {}

  for (const key in this) {
    if (this.hasOwnProperty(key)) {
      json[key] = typeof this[key]?.toJSON === 'function' ? this[key]?.toJSON() : this[key]
    } 
  }

  return json
}