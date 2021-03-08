const express = require('express')
const { GET_CACHE, SET_CACHE, http } = require('../../helpers')
const router = express.Router()

router.get('/list/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('landpads')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/list', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('landpads')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('landpads')
    await SET_CACHE(
      'landpads',
      JSON.stringify(respone.data),
      'EX',
      900
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:landpadId/withoutCache', async (req, res) => {
  try {
    const respone = await http.get(`landpads/${req.params.landpadId}`)
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:landpadId', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE(`landpad_${req.params.landpadId}`)
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get(`landpads/${req.params.landpadId}`)
    await SET_CACHE(
      `landpad_${req.params.landpadId}`,
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