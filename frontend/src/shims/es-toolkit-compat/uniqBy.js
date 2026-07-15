function uniqBy(arr, iteratee) {
  const seen = new Set()
  return arr.filter(item => {
    const val = typeof iteratee === 'function' ? iteratee(item) : item[iteratee]
    if (seen.has(val)) return false
    seen.add(val)
    return true
  })
}
export default uniqBy
export { uniqBy }
