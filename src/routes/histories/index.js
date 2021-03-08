const express = require('express')
const { GET_CACHE, SET_CACHE, http } = require('../../helpers')
const router = express.Router()

router.get('/list/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('history')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/list', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('history')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('history')
    await SET_CACHE(
      'history',
      JSON.stringify(respone.data),
      'EX',
      900
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:historyId/withoutCache', async (req, res) => {
  try {
    const respone = await http.get(`history/${req.params.historyId}`)
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:historyId', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE(`history_${req.params.historyId}`)
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get(`history/${req.params.historyId}`)
    await SET_CACHE(
      `history_${req.params.historyId}`,
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