require('dotenv/config')
const express = require('express')
const { GET_CACHE, SET_CACHE, http } = require('../../helpers')
const router = express.Router()

const CACHE_TIME = process.env.CACHE_TIME || 900

router.get('/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('roadster')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('roadster')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('roadster')
    await SET_CACHE(
      'roadster',
      JSON.stringify(respone.data),
      'EX',
      CACHE_TIME
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router