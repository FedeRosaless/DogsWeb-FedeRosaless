const { Router } = require('express');
const RouteDog = require('./DogRoute.js')
const router = Router();
const RouteTemp = require('./Temperaments.js')



router.use('/dogs',RouteDog);
router.use('/temperaments',RouteTemp)

module.exports = router;
