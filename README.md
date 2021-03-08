# Redis Node Example

Redis Caching (or **ANY CACHING**) is implemented when the data change is ***not frequent***.

This repository uses Redis for caching the Requests made to the Server. For Usage, this Application uses Spacex API.

### [SPACEX API](https://api.spacexdata.com/v3)

The Documentation for the SPACEX API can be found [here](https://docs.spacexdata.com/#intro)

POSTMAN Collection can be found [here](https://go.postman.co/network/import?collection=2025350-4dbc43b2-4fcf-41e0-92b9-b161a5015d32-RWaEzAiG&referrer=https%3A%2F%2Fdocs.spacexdata.com%2F%2365e19a5a-f67f-46f2-be16-283c1a783c36&versionTag=latest).

### Usage Of Redis
* Installation
```js
npm install redis
```

* Usage
```js
require('dotenv/config')
const redis = require('redis')
const { promisify } = require('util')

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1' // HOST for REDIS server
const REDIS_PORT = process.env.REDIS_PORT || 6379 // PORT for REDIS server

const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
})

const GET_CACHE = promisify(client.get).bind(client)
const SET_CACHE = promisify(client.set).bind(client)

module.exports = {
  GET_CACHE,
  SET_CACHE
}
```
Then in any file, we need to import `GET_CACHE` and `SET_CACHE` to access and set cache data.
```js
const cachedResponse = await GET_CACHE('capsules')
if (cachedResponse) {
  res.status(200).json(JSON.parse(cachedResponse))
  return
}
const respone = await http.get('capsules')
await SET_CACHE(
  'capsules',
  JSON.stringify(respone.data),
  'EX',
  CACHE_TIME
)
res.status(200).json(respone.data)
```

### Usage of this APP:

1. Take the clone of the Repository.
```sh
git clone https://github.com/prashant1k99/redis-node-example.git
```
2. Install all the dependencies for the application.
```sh
npm install
```
3. Run the local server.
```
npm run start
```
This will start the server on PORT 5000

4. **ADVANCE** You can find the http files for the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) plugin for VS Code in [`http`](https://github.com/prashant1k99/redis-node-example/tree/master/http) folder