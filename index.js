require('dotenv').config()
const express = require('express')
const responseTime = require('response-time')

const { rocketRoutes, capsuleRoutes, dragonRoutes, coreRoutes } = require('./src/routes')

const app = express()

const PORT = process.env.PORT || 5000

app.use(responseTime())

app.use('/rocket', rocketRoutes)
app.use('/capsule', capsuleRoutes)
app.use('/dragon', dragonRoutes)
app.use('/core', coreRoutes)

app.use('*', (req, res) => {
  res.send('Hello')
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})