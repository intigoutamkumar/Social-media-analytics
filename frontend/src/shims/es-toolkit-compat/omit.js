function omit(obj, ...keys) {
  const result = {}
  const keySet = new Set(keys.flat())
  for (const key in obj) {
    if (!keySet.has(key) && Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key]
    }
  }
  return result
}
export default omit
export { omit }
