function throttle(fn, wait) {
  let lastTime = 0
  let timeoutId = null
  return function(...args) {
    const now = Date.now()
    const remaining = wait - (now - lastTime)
    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      lastTime = now
      return fn.apply(this, args)
    }
  }
}
export default throttle
export { throttle }
