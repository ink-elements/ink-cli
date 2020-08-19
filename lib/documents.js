const path = require('path')
const fs = require('fs-extra')

class Document {

  constructor(folder, htmlFile, outputPath, pageFormat) {
    this.folder = folder
    this.htmlFile = htmlFile
    this.outputPath = outputPath
    this.pageFormat = pageFormat
  }

  get htmlDirectory() {
    return path.dirname(this.htmlFile)
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

  get outputFile() {
    return `${this.outputPath}${this.name}-${this.version}.pdf`
  }

}

class FullDocument extends PackageDocument(Document) { }

const loadDocument = (folder, htmlFile, outputPath, pageFormat) => {
  return new FullDocument(folder, htmlFile, outputPath, pageFormat)
}

exports.load = loadDocument
