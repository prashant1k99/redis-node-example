const {
  GET_CACHE,
  SET_CACHE
} = require('./redis')
const http = require('./axios')

module.exports = {
  GET_CACHE,
  SET_CACHE,
  http
}