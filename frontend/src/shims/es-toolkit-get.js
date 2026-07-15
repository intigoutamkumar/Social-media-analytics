// Shim to provide a default export for the `get` util from es-toolkit
// This fixes the issue where dependencies try to import a default export from es-toolkit/compat/get.js

// Simple object path getter function
const get = (obj, path, defaultValue) => {
  if (!obj || !path) return defaultValue
  
  const keys = typeof path === 'string' ? path.split(/[.\\[\\]"']+/).filter(Boolean) : path
  let result = obj
  
  for (const key of keys) {
    if (result == null) return defaultValue
    result = result[key]
  }
  
  return result !== undefined ? result : defaultValue
}

export default get
export { get }


