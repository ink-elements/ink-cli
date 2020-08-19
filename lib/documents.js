const path = require('path')
const fs = require('fs-extra')

class Document {

  constructor(folder, pageFormat) {
    this.folder = folder
    this.pageFormat = pageFormat
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

const loadDocument = (folder, pageFormat) => {
  return new FullDocument(folder, pageFormat)
}

exports.load = loadDocument
