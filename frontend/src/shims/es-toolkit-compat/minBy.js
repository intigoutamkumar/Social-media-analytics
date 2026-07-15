function minBy(arr, iteratee) {
  if (!arr.length) return undefined
  let min = arr[0]
  let minVal = typeof iteratee === 'function' ? iteratee(min) : min[iteratee]
  for (let i = 1; i < arr.length; i++) {
    const val = typeof iteratee === 'function' ? iteratee(arr[i]) : arr[i][iteratee]
    if (val < minVal) {
      min = arr[i]
      minVal = val
    }
  }
  return min
}
export default minBy
export { minBy }
