const yeoman = require('yeoman-environment')
const puppeteer = require('puppeteer')
const fileUrl = require('file-url')
const fs = require('fs-extra')

exports.init = folderName => {

  const env = yeoman.createEnv()
  const module = require.resolve('generator-ink-doc/generators/app')

  env.register(module, 'ink-doc:app')
  env.run(['ink-doc:app', folderName])

}

exports.publish = async() => {

  const url = fileUrl('dist/html/index.html')
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const output = `dist/documents/${pkg.name}-${pkg.version}.pdf`
  fs.ensureDir('dist/documents')

  const browser = await puppeteer.launch({ headless: true })

  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle0' })
  await page.emulateMedia('print')
  await page.pdf({ path: output, format: 'A4', printBackground: true })

  await browser.close()

}
