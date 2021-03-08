require('dotenv/config')
const redis = require('redis')
const { promisify } = require('util')

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'
const REDIS_PORT = process.env.REDIS_PORT || 6379

const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
})

client.on("error", function(error) {
  console.error(error);
})

const GET_CACHE = promisify(client.get).bind(client)
const SET_CACHE = promisify(client.set).bind(client)

module.exports = {
  GET_CACHE,
  SET_CACHE
}