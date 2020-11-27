try {
  const { escapeHTML } = require('./index')
  console.info(escapeHTML('<div>1</div>'))
} catch (e) {
  console.error(e)
  throw e
}
