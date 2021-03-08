const express = require('express')
const axios = require('axios')
const { GET_CACHE, SET_CACHE, http } = require('../../helpers')
const router = express.Router()

router.get('/list', async (req, res) => {
  try {
    const cachedResponse = await GET_CACHE('rockets')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('rockets')
    const saveResult = await SET_CACHE(
      'rockets',
      JSON.stringify(respone.data),
      'EX',
      10
    )
    console.log('new data cached', saveResult)
    res.send(respone.data)
    const data = await http.get('rockets')
    res.status(200).send(data.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router