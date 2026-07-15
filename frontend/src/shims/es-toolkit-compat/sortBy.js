function sortBy(arr, iteratee) {
  return [...arr].sort((a, b) => {
    const aVal = typeof iteratee === 'function' ? iteratee(a) : a[iteratee]
    const bVal = typeof iteratee === 'function' ? iteratee(b) : b[iteratee]
    if (aVal === bVal) return 0
    return aVal < bVal ? -1 : 1
  })
}
export default sortBy
export { sortBy }
