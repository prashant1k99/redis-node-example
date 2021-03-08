require('dotenv/config')
const express = require('express')
const { GET_CACHE, SET_CACHE, http } = require('../../helpers')
const router = express.Router()

const CACHE_TIME = process.env.CACHE_TIME || 900

router.get('/list/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('dragons')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/list', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('dragons')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('dragons')
    await SET_CACHE(
      'dragons',
      JSON.stringify(respone.data),
      'EX',
      CACHE_TIME
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:dragonId/withoutCache', async (req, res) => {
  try {
    const respone = await http.get(`dragons/${req.params.dragonId}`)
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:dragonId', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE(`dragon_${req.params.dragonId}`)
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get(`dragons/${req.params.dragonId}`)
    await SET_CACHE(
      `dragon_${req.params.dragonId}`,
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