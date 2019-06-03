const yeoman = require('yeoman-environment')
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const liveServer = require('live-server')

exports.init = folderName => {

  const env = yeoman.createEnv()
  const module = require.resolve('generator-ink-doc/generators/app')

  env.register(module, 'ink-doc:app')
  env.run(['ink-doc:app', folderName])

}

exports.publish = async(document) => {

  liveServer.start({ root: 'dist/html/', port: 8080, open: false })

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' })
    await page.emulateMedia('print')

    const output = `dist/documents/${document.name}-${document.version}.pdf`
    fs.ensureDir('dist/documents')

    await page.pdf({ path: output, format: document.size, printBackground: true })
  } catch (error) {
    console.error(error)
  } finally {
    liveServer.shutdown()
    await browser.close()
    process.exit()
  }

}
