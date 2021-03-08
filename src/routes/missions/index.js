require('dotenv/config')
const express = require('express')
const { GET_CACHE, SET_CACHE, http } = require('../../helpers')
const router = express.Router()

const CACHE_TIME = process.env.CACHE_TIME || 900

router.get('/list/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('missions')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/list', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('missions')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('missions')
    await SET_CACHE(
      'missions',
      JSON.stringify(respone.data),
      'EX',
      CACHE_TIME
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:missionId/withoutCache', async (req, res) => {
  try {
    const respone = await http.get(`missions/${req.params.missionId}`)
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:missionId', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE(`mission_${req.params.missionId}`)
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get(`missions/${req.params.missionId}`)
    await SET_CACHE(
      `mission_${req.params.missionId}`,
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