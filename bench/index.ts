import fs from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

import Benchmark from 'benchmark'
import chalk from 'chalk'
import { htmlEscape } from 'escape-goat'

import { escapeHTML, escapeHTMLBuf, asyncEscapeHTMLBuf } from '../index.js'

const fixture = fs.readFileSync(join(fileURLToPath(import.meta.url), '..', 'fixture'), 'utf8')
const miniFixture = '<div>{props.getNumber()}</div>'
const fixtureBuffer = Buffer.from(fixture)
const miniFixtureBuffer = Buffer.from(miniFixture)

const largeSuite = new Benchmark.Suite('Large input')
const miniSuite = new Benchmark.Suite('Small input')

function run(suite: Benchmark.Suite, fx: string, fxBuffer: Buffer) {
  return new Promise<void>((resolve) => {
    suite
      .add('napi', () => {
        escapeHTML(fx)
      })
      .add('napi#buff', () => {
        escapeHTMLBuf(fxBuffer)
      })
      .add(
        'napi#asyncBuff',
        async (defer: any) => {
          await asyncEscapeHTMLBuf(fxBuffer)
          defer.resolve()
        },
        {
          defer: true,
        },
      )
      .add('javascript', () => {
        htmlEscape(fx)
      })
      .on('cycle', function (event: Benchmark.Event) {
        // @ts-expect-error
        event.target.name = `${event.target.name} @ ${suite.name}`
        console.info(String(event.target))
      })
      .on('complete', function (this: Benchmark.Target & Benchmark.Suite) {
        console.info(
          `${this.name} bench suite: Fastest is ${chalk.green(
            this.filter('fastest').map((t: Benchmark.Target) => t.name),
          )}`,
        )
        resolve()
      })
      .run()
  })
}

run(largeSuite, fixture, fixtureBuffer).then(() => run(miniSuite, miniFixture, miniFixtureBuffer))
