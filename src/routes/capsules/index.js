const express = require('express')
const { GET_CACHE, SET_CACHE, http } = require('../../helpers')
const router = express.Router()

router.get('/list/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('capsules')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/list', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('capsules')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('capsules')
    await SET_CACHE(
      'capsules',
      JSON.stringify(respone.data),
      'EX',
      900
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/upcoming/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('capsules/upcoming')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/upcoming', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('capsules-upcoming')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('capsules/upcoming')
    await SET_CACHE(
      'capsules-upcoming',
      JSON.stringify(respone.data),
      'EX',
      900
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/past/withoutCache', async (_, res) => {
  try {
    const respone = await http.get('capsules/past')
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/past', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('capsules-past')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('capsules/past')
    await SET_CACHE(
      'capsules-past',
      JSON.stringify(respone.data),
      'EX',
      900
    )
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:capsuleSerial/withoutCache', async (req, res) => {
  try {
    const respone = await http.get(`capsules/${req.params.capsuleSerial}`)
    res.status(200).json(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:capsuleSerial', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE(`capsule_${req.params.capsuleSerial}`)
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get(`capsules/${req.params.capsuleSerial}`)
    await SET_CACHE(
      `capsule_${req.params.capsuleSerial}`,
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