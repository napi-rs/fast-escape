const { escapeHTML } = require('./index')

console.assert(escapeHTML('<div>1</div>') === '&lt;div&gt;1&lt;&#x2f;div&gt;', 'Simple test failed')

console.info('Simple test passed')
