#!/usr/bin/env node
'use strict'

const updateNotifier = require('update-notifier')
const meow = require('meow')
const scribe = require('./lib/scribe.js')

const cli = meow(`
  Usage
    $ scribe

  Options
    init <path>   Create a new ink-elements project
    publish       Generate PDF document from HTML

  Examples
    $ scribe init project-folder
    $ cd project-folder
    $ npm run build
    $ scribe publish
`, {
})

updateNotifier({ pkg: cli.pkg }).notify()

console.log(`${cli.pkg.name} (version ${cli.pkg.version})`)

if (cli.input.length === 0) {
  console.error(cli.help)
  process.exit(1)
} else if (cli.input[0] === 'init') {
  scribe.init(cli.input[1])
} else if (cli.input[0] === 'publish') {
  scribe.publish()
}
