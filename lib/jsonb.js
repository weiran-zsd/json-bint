/**
 * @fileoverview JSONB parser and stringifier
 * @author 唯然<weiran.zsd@outlook.com>
 */
import { parseJson } from '@ton.js/json-parser'
const isBNSupported = typeof BigInt !== 'undefined'
const BN = isBNSupported ? BigInt : (x) => x

export function parse(s) {
  function reviver(k, v, ctx) {
    let isSafe = true

    const isInt = typeof v === 'number' && /^(-)?\d+$/.test(ctx.source)
    // 如果是整数的话，也要检查是否超过了安全整数范围
    if (isInt) {
      isSafe = Number.isSafeInteger(v)
    }

    return isSafe ? v : BN(ctx.source)
  }

  return parseJson(s, reviver)
}

function stringify(data) {
  if (data === undefined) return undefined
  if (data === null) return 'null'
  if (Number.isNaN(data)) return 'null'
  if (data === Infinity || data === -Infinity) return 'null'
  if (data.constructor === String) return '"' + data.replace(/"/g, '\\"') + '"'
  if (data.constructor === Number) return String(data)
  if (isBNSupported && data.constructor === BigInt) return String(data) // 避免bigint精度丢失
  if (data.constructor === Boolean) return data ? 'true' : 'false'
  if (data.constructor === Array)
    return (
      '[' +
      data
        .reduce((acc, v) => {
          if (
            v === undefined ||
            Number.isNaN(v) ||
            v === Infinity ||
            v === -Infinity
          )
            return [...acc, 'null']
          else return [...acc, stringify(v)]
        }, [])
        .join(',') +
      ']'
    )

  if (data.constructor === Object)
    return (
      '{' +
      Object.keys(data)
        .reduce((acc, k) => {
          if (data[k] === undefined) return acc
          else return [...acc, stringify(k) + ':' + stringify(data[k])]
        }, [])
        .join(',') +
      '}'
    )

  throw new Error(`Unsupported type: ${data.constructor.name}`)
}

export default { parse, stringify }
