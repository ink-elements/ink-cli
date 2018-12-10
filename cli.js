#!/usr/bin/env node
'use strict'

const updateNotifier = require('update-notifier')
const meow = require('meow')
const ink = require('./lib/ink.js')

const cli = meow(`
  Usage
    $ ink

  Options
    init <path>   Create a new ink-elements project
    publish       Generate PDF document from HTML

  Examples
    $ ink init project-folder
    $ cd project-folder
    $ npm run build
    $ ink publish
`, {
})

updateNotifier({ pkg: cli.pkg }).notify()

console.log(`${cli.pkg.name} (version ${cli.pkg.version})`)

if (cli.input.length === 0) {
  console.error(cli.help)
  process.exit(1)
} else if (cli.input[0] === 'init') {
  ink.init(cli.input[1])
} else if (cli.input[0] === 'publish') {
  ink.publish()
}
