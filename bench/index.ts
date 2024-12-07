import fs from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

import { Bench } from 'tinybench'
import { htmlEscape } from 'escape-goat'

import { escapeHTML, escapeHTMLBuf, asyncEscapeHTMLBuf } from '../index.js'

const fixture = fs.readFileSync(join(fileURLToPath(import.meta.url), '..', 'fixture'), 'utf8')
const miniFixture = '<div>{props.getNumber()}</div>'
const fixtureBuffer = Buffer.from(fixture)
const miniFixtureBuffer = Buffer.from(miniFixture)

const largeSuite = new Bench({ name: 'Large input' })
const miniSuite = new Bench({ name: 'Small input' })

async function run(suite: Bench, fx: string, fxBuffer: Buffer) {
  suite.add('napi', () => {
    escapeHTML(fx)
  })

  suite.add('napi#buff', () => {
    escapeHTMLBuf(fxBuffer)
  })

  suite.add('napi#asyncBuff', async () => {
    await asyncEscapeHTMLBuf(fxBuffer)
  })

  suite.add('javascript', () => {
    htmlEscape(fx)
  })

  await suite.run()

  console.table(suite.table())
}

run(largeSuite, fixture, fixtureBuffer).then(() => run(miniSuite, miniFixture, miniFixtureBuffer))
