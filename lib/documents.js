const path = require('path')
const fs = require('fs-extra')

class Document {

  constructor(folder, size) {
    this.folder = folder
    this.size = size
  }

}

const PackageDocument = Base => class extends Base {

  get pkg() {
    if (!this.__pkg) {
      const json = path.resolve(this.folder, 'package.json')
      this.__pkg = JSON.parse(fs.readFileSync(json, 'utf8'))
    }

    return this.__pkg
  }

  get name() {
    return this.pkg.name
  }

  get version() {
    return this.pkg.version
  }

}

const StylesheetDocument = Base => class extends Base {

}

class FullDocument extends StylesheetDocument(PackageDocument(Document)) { }

const loadDocument = (folder, page) => {
  return new FullDocument(folder, page)
}

exports.load = loadDocument
