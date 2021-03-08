require('dotenv').config()
const express = require('express')
const responseTime = require('response-time')

const { 
  rocketRoutes, 
  capsuleRoutes, 
  dragonRoutes, 
  coreRoutes, 
  historyRoute, 
  landpadRoute,
  launchRoute,
  missionRoute,
  payloadRoute
} = require('./src/routes')

const app = express()

const PORT = process.env.PORT || 5000

app.use(responseTime())

app.use('/rocket', rocketRoutes)
app.use('/capsule', capsuleRoutes)
app.use('/dragon', dragonRoutes)
app.use('/core', coreRoutes)
app.use('/history', historyRoute)
app.use('/landpad', landpadRoute)
app.use('/launch', launchRoute)
app.use('/mission', missionRoute)
app.use('/payload', payloadRoute)

app.use('*', (_, res) => {
  res.send('Hello')
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})