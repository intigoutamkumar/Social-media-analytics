function get(obj, path, defaultValue) {
  if (!obj || !path) return defaultValue
  const keys = typeof path === 'string'
    ? path.split(/[.\\[\\]"']+/).filter(Boolean)
    : Array.isArray(path)
      ? path
      : [path]
  let result = obj
  for (const key of keys) {
    if (result == null) return defaultValue
    result = result[key]
  }
  return result !== undefined ? result : defaultValue
}
export default get
export { get }
