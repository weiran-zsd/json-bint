import test from 'node:test'
import { strict as assert } from 'node:assert'
import JSONB from './jsonb.cjs'

test('parse jsonb: obj', () => {
  const content = '{ "foo": { "bar": { "value": 12345678901234567890 } } }'
  const parsed = JSONB.parse(content)

  assert.strictEqual(typeof parsed.foo.bar.value, 'bigint')
  assert.strictEqual(parsed.foo.bar.value, 12345678901234567890n)
})

test('parse jsonb: neg', () => {
  const content = '{ "value": -12345678901234567890 }'
  const parsed = JSONB.parse(content)

  assert.strictEqual(typeof parsed.value, 'bigint')
  assert.strictEqual(parsed.value, -12345678901234567890n)
})

test('parse jsonb: floating', () => {
  const content = '{ "value": 1.0 }'
  const parsed = JSONB.parse(content)

  assert.strictEqual(typeof parsed.value, 'number')
  assert.strictEqual(parsed.value, 1.0)
})

test('parse jsonb: arr', () => {
  const content = '[ 1, 12345678901234567890 ]'
  const parsed = JSONB.parse(content)

  assert.strictEqual(typeof parsed[0], 'number')
  assert.strictEqual(parsed[0], 1)

  assert.strictEqual(typeof parsed[1], 'bigint')
  assert.strictEqual(parsed[1], 12345678901234567890n)
})

test('parse jsonb: str', () => {
  const content = '{"value": "foo"}'
  const parsed = JSONB.parse(content)

  assert.strictEqual(typeof parsed.value, 'string')
  assert.strictEqual(parsed.value, 'foo')
})

test('parse jsonb: bool', () => {
  const content = '{"value": true}'
  const parsed = JSONB.parse(content)

  assert.strictEqual(typeof parsed.value, 'boolean')
  assert.strictEqual(parsed.value, true)
})

test('stringify jsonb', () => {
  const obj = { foo: { bar: { value: 12345678901234567890n } } }
  const str = JSONB.stringify(obj)

  assert.strictEqual(str, '{"foo":{"bar":{"value":12345678901234567890}}}')
})

test('stringify jsonb: arr', () => {
  const obj = [1, 12345678901234567890n]
  const str = JSONB.stringify(obj)

  assert.strictEqual(str, '[1,12345678901234567890]')
})

test('stringify jsonb: bool', () => {
  const obj = true
  const str = JSONB.stringify(obj)

  assert.strictEqual(str, 'true')
})

test('stringify jsonb: number', () => {
  const obj = 123
  const str = JSONB.stringify(obj)

  assert.strictEqual(str, '123')
})

test('stringify jsonb: neg number', () => {
  const obj = -123
  const str = JSONB.stringify(obj)

  assert.strictEqual(str, '-123')
})

test('stringify jsonb: obj', () => {
  const obj = { foo: true, bar: 1n, quz: true, baz: [-1, 2, 3n], qux: null }
  const str = JSONB.stringify(obj)

  assert.strictEqual(
    str,
    '{"foo":true,"bar":1,"quz":true,"baz":[-1,2,3],"qux":null}',
  )
})
