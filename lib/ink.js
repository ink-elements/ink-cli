const yeoman = require('yeoman-environment')
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const httpServer = require('http-server')

exports.init = folderName => {

  const env = yeoman.createEnv()
  const module = require.resolve('generator-ink-doc/generators/app')

  env.register(module, 'ink-doc:app')
  env.run(['ink-doc:app', folderName])

}

exports.publish = async() => {

  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

  const server = httpServer.createServer({ root: 'dist/html/' })
  server.listen(8080)

  const browser = await puppeteer.launch({ headless: true })

  try {
    const page = await browser.newPage()
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' })
    await page.emulateMedia('print')

    const output = `dist/documents/${pkg.name}-${pkg.version}.pdf`
    fs.ensureDir('dist/documents')

    await page.pdf({ path: output, format: 'A4', printBackground: true })
  } catch (error) {
    console.error(error)
  } finally {
    server.close()
    await browser.close()
    process.exit()
  }

}
