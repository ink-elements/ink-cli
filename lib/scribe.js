const yeoman = require('yeoman-environment')
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const liveServer = require('live-server')
const resolve = require('path').resolve

exports.init = folderName => {

  const env = yeoman.createEnv()
  const module = require.resolve('generator-ink-doc/generators/app')

  env.register(module, 'ink-doc:app')
  env.run(['ink-doc:app', folderName])

}

exports.publish = async(document) => {

  console.log(`publishing ${document.htmlFile} => ${document.outputFile}`)

  liveServer.start({
    root: document.htmlDirectory,
    port: 8080,
    open: false,
    logLevel: 0
  })

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', `--user-data-dir=./.scribe-cli`]
  })

  try {
    const page = await browser.newPage()

    await page.setBypassCSP(true)
    await page.goto(`file://${resolve(document.htmlFile)}`)
    await page.emulateMediaType('print')

    fs.ensureDir(document.outputPath)

    await page.pdf(
      {
        path: document.outputFile,
        format: document.pageFormat,
        printBackground: true
      }
    )
  } catch (error) {
    console.error(error)
  } finally {
    liveServer.shutdown()
    await browser.close()
    process.exit()
  }

}
