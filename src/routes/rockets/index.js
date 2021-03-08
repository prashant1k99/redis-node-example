const express = require('express')
const { GET_CACHE, SET_CACHE, http } = require('../../helpers')
const router = express.Router()

router.get('/list/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('rockets')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/list', async (req, res) => {
  try {
    if (req.query.cache != 'false') {
      const cachedResponse = await GET_CACHE('rockets')
      if (cachedResponse) {
        res.status(200).json(JSON.parse(cachedResponse))
        return
      }
    }
    const respone = await http.get('rockets')
    (req.query.cache != 'false') && await SET_CACHE(
      'rockets',
      JSON.stringify(respone.data),
      'EX',
      900
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:rocketId/withoutCache', async (req, res) => {
  try {
    const respone = await http.get(`rockets/${req.params.rocketId}`)
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:rocketId', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE(`rocket_${req.params.rocketId}`)
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get(`rockets/${req.params.rocketId}`)
    await SET_CACHE(
      `rocket_${req.params.rocketId}`,
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