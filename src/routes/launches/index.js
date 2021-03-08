require('dotenv/config')
const express = require('express')
const { GET_CACHE, SET_CACHE, http } = require('../../helpers')
const router = express.Router()

const CACHE_TIME = process.env.CACHE_TIME || 900

router.get('/list/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('launches')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/list', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('launches')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('launches')
    await SET_CACHE(
      'launches',
      JSON.stringify(respone.data),
      'EX',
      CACHE_TIME
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/upcoming/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('launches/upcoming')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/upcoming', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('launches-upcoming')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('launches/upcoming')
    await SET_CACHE(
      'launches-upcoming',
      JSON.stringify(respone.data),
      'EX',
      CACHE_TIME
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/past/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('launches/past')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/past', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('launches-past')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('launches/past')
    await SET_CACHE(
      'launches-past',
      JSON.stringify(respone.data),
      'EX',
      CACHE_TIME
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/latest/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('launches/latest')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/latest', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('launches-latest')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('launches/latest')
    await SET_CACHE(
      'launches-latest',
      JSON.stringify(respone.data),
      'EX',
      CACHE_TIME
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/next/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('launches/next')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/next', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('launches-next')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('launches/next')
    await SET_CACHE(
      'launches-next',
      JSON.stringify(respone.data),
      'EX',
      CACHE_TIME
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:flightNumber/withoutCache', async (req, res) => {
  try {
    const respone = await http.get(`launches/${req.params.flightNumber}`)
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:flightNumber', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE(`launch_${req.params.flightNumber}`)
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get(`launches/${req.params.flightNumber}`)
    await SET_CACHE(
      `launch_${req.params.flightNumber}`,
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