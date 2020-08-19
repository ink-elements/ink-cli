import test from 'ava'
import path from 'path'
import pathExists from 'path-exists'
import execa from 'execa'
import tempy from 'tempy'
import fs from 'fs-extra'

function scribeCli(args) {
  const cliPath = path.resolve(__dirname, 'cli.js')
  const result = execa.sync(cliPath, args)

  if (result.stderr) {
    console.log(result.stderr)
  }
}

async function withTestFolder(testWith) {
  const temp = tempy.directory()
  process.chdir(temp)

  try {
    await testWith(temp)
  } finally {
    process.chdir(__dirname)
    await fs.remove(temp)
  }
}

test('should create ink project', async t => {
  await withTestFolder(async folder => {
    scribeCli(['init', 'project-folder'])

    const project = path.resolve(folder, 'project-folder')
    t.true(pathExists.sync(project))
  })
})

test('should publish PDF', async t => {
  await withTestFolder(async folder => {
    scribeCli(['init', 'test'])
    const project = path.resolve(folder, 'test')
    process.chdir(project)
    execa.sync('npm', ['run', 'build'])
    scribeCli(['publish', 'dist/html/index.html', 'dist/documents/'])

    const pdf = path.resolve(folder, 'test/dist/documents/test-0.0.0.pdf')
    t.true(pathExists.sync(pdf))
  })
})
