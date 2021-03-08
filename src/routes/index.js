const rocketRoutes = require('./rockets')
const capsuleRoutes = require('./capsules')
const dragonRoutes = require('./dragons')
const coreRoutes = require('./cores')
const historyRoute = require('./histories')
const landpadRoute = require('./landingPads')
const launchRoute = require('./launches')
const missionRoute = require('./missions')

module.exports = {
  rocketRoutes,
  capsuleRoutes,
  dragonRoutes,
  coreRoutes,
  historyRoute,
  landpadRoute,
  launchRoute,
  missionRoute
}