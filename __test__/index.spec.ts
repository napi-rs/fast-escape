import test from 'ava'

import { escapeHTML } from '../index'

test('escape html', (t) => {
  t.snapshot(escapeHTML(`<div>{props.getNumber()}</div>`))
})
