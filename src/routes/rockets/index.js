const express = require('express')
const { GET_CACHE, SET_CACHE, http } = require('../../helpers')
const router = express.Router()

router.get('/list', async (_, res) => {
  try {
    const cachedResponse = await GET_CACHE('rockets')
    if (cachedResponse) {
      res.status(200).json(JSON.parse(cachedResponse))
      return
    }
    const respone = await http.get('rockets')
    await SET_CACHE(
      'rockets',
      JSON.stringify(respone.data),
      'EX',
      900
    )
    res.status(200).send(respone.data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router