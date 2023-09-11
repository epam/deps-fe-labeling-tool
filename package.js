const exec = require('child_process').exec
const fs = require('fs')
const fse = require('fs-extra')

fs.rmSync('package', { recursive: true, force: true })

exec('mkdir package && cd package && mkdir lib && babel --config-file ../package.babel.js ../src -d lib --extensions .js,.jsx,.snap --copy-files --no-copy-ignored', (err) => {
  if (err) {
    throw err
  } else {
    fse.copy('dist', 'package/dist', (err) => {
      if (err) {
        throw err
      }
    })
    fs.copyFile('package.json', 'package/package.json', (err) => {
      if (err) {
        throw err
      }
    })
    fs.copyFile('yarn.lock', 'package/yarn.lock', (err) => {
      if (err) {
        throw err
      }
    })
  }
})
