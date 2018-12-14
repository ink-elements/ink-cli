const path = require('path')
const fs = require('fs-extra')

const loadDocument = (folder) => {

  const json = path.resolve(folder, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(json, 'utf8'))

  return {
    name: pkg.name,
    version: pkg.version
  }

}

exports.load = loadDocument
