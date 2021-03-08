const express = require('express')
const { GET_CACHE, SET_CACHE, http } = require('../../helpers')
const router = express.Router()

router.get('/list/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('payloads')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/list', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('payloads')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('payloads')
    await SET_CACHE(
      'payloads',
      JSON.stringify(respone.data),
      'EX',
      900
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:payloadId/withoutCache', async (req, res) => {
  try {
    const respone = await http.get(`payloads/${req.params.payloadId}`)
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:payloadId', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE(`payload_${req.params.payloadId}`)
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get(`payloads/${req.params.payloadId}`)
    await SET_CACHE(
      `payload_${req.params.payloadId}`,
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