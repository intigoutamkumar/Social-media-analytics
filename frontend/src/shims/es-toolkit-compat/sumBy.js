function sumBy(arr, iteratee) {
  return arr.reduce((sum, item) => sum + (typeof iteratee === 'function' ? iteratee(item) : item[iteratee]), 0)
}
export default sumBy
export { sumBy }
