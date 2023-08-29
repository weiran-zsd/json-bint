const { parse, stringify } = require('./jsonb.cjs')

module.exports.transformRequest = function transformRequest(data, headers) {
  if (data.constructor === Object) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
    return stringify(data)
  }
  return data;
}

module.exports.transformResponse = function transformResponse(data) {
  return typeof data === 'string' ? parse(data) : data
}
