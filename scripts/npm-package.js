const exec = require('child_process').exec
const fs = require('fs')

fs.rmSync('lib', { recursive: true, force: true })

exec('mkdir lib && babel --config-file ./npm-package.babel.js ./src -d lib --extensions .js,.jsx,.snap --copy-files --no-copy-ignored', (err) => {
  if (err) {
    throw err
  }
})
