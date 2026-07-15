function maxBy(arr, iteratee) {
  if (!arr.length) return undefined
  let max = arr[0]
  let maxVal = typeof iteratee === 'function' ? iteratee(max) : max[iteratee]
  for (let i = 1; i < arr.length; i++) {
    const val = typeof iteratee === 'function' ? iteratee(arr[i]) : arr[i][iteratee]
    if (val > maxVal) {
      max = arr[i]
      maxVal = val
    }
  }
  return max
}
export default maxBy
export { maxBy }
