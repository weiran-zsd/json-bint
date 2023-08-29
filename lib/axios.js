import { parse, stringify } from './jsonb.js'
export function transformRequest(data, headers) {
  if (data.constructor === Object) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
    return stringify(data)
  }
  return data
}

export function transformResponse(data) {
  return typeof data === 'string' ? parse(data) : data
}
