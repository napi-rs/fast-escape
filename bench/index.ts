import fs from 'fs'
import { join } from 'path'

import Benchmark, { Suite } from 'benchmark'
import chalk from 'chalk'
import { htmlEscape } from 'escape-goat'

import { escapeHTML, escapeHTMLBuf } from '../index'

const fixture = fs.readFileSync(join(__dirname, 'fixture.html'), 'utf8')
const miniFixture = '<div>{props.getNumber()}</div>'
const fixtureBuffer = Buffer.from(fixture)
const miniFixtureBuffer = Buffer.from(miniFixture)

const largeSuite = new Suite('Escape html benchmark # Large input')
const miniSuite = new Suite('Escape html benchmark # Small input')

function run(suite: Suite, fx: string, fxBuffer: Buffer) {
  suite
    .add('napi', () => {
      escapeHTML(fx)
    })
    .add('napi#buff', () => {
      escapeHTMLBuf(fxBuffer)
    })
    .add('javascript', () => {
      htmlEscape(fx)
    })
    .on('cycle', function (event: Benchmark.Event) {
      console.info(String(event.target))
    })
    .on('complete', function (this: Benchmark.Target & Benchmark.Suite) {
      console.info(
        `${this.name} bench suite: Fastest is ${chalk.green(
          this.filter('fastest').map((t: Benchmark.Target) => t.name),
        )}`,
      )
    })
    .run()
}

run(largeSuite, fixture, fixtureBuffer)
run(miniSuite, miniFixture, miniFixtureBuffer)
