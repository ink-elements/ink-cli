# Scribe CLI [![Build Status](https://travis-ci.org/rg-wood/scribe-cli.svg?branch=master)](https://travis-ci.org/rg-wood/scribe-cli) [![Known Vulnerabilities](https://snyk.io/test/github/rg-wood/scribe-cli/badge.svg?targetFile=package.json)](https://snyk.io/test/github/rg-wood/scribe-cli?targetFile=package.json)

> Command line tool to manage ink-elements projects

## Install

```
$ npm install --global scribe-cli
```

## Usage

```
$ scribe --help

  Usage
    $ scribe

  Options
    init <path>                                Create a new ink-elements project
    publish --page-format <size> <html> <path> Generate PDF document from HTML

  Examples
    $ scribe init project-folder
    $ cd project-folder
    $ npm run build
    $ scribe publish --page-format A4 ./dist/html/index.html dist/documents/
```

## Related

- [ink-elements](https://github.com/rgladwell/ink-elements) - Web component library used for this framework

## License

MIT © [R.G. Wood](https://grislyeye.com)
