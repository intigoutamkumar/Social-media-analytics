function range(start, end, step) {
  const result = []
  if (end === undefined) {
    end = start
    start = 0
  }
  step = step || 1
  if (step > 0) {
    for (let i = start; i < end; i += step) result.push(i)
  } else {
    for (let i = start; i > end; i += step) result.push(i)
  }
  return result
}
export default range
export { range }
