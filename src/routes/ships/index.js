const express = require('express')
const { GET_CACHE, SET_CACHE, http } = require('../../helpers')
const router = express.Router()

router.get('/list/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('ships')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/list', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('ships')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('ships')
    await SET_CACHE(
      'ships',
      JSON.stringify(respone.data),
      'EX',
      900
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:shipId/withoutCache', async (req, res) => {
  try {
    const respone = await http.get(`ships/${req.params.shipId}`)
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:shipId', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE(`ship_${req.params.shipId}`)
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get(`ships/${req.params.shipId}`)
    await SET_CACHE(
      `ship_${req.params.shipId}`,
      JSON.stringify(respone.data),
      'EX',
      900
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})


module.exports = router