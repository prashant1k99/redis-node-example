const axios = require('axios')

const http = axios.create({
  baseURL: 'https://api.spacexdata.com/v3'
});

module.exports = http