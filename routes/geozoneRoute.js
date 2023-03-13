const Router = require('express')
const router = new Router()
const controller = require('../controllers/geozoneController')


router.post('/', controller.createZone)

router.get('/', controller.getAllZones)
router.get('/:name', controller.getZone)

router.patch('/:name', controller.updateZone)

router.delete('/:name', controller.deleteZone)

router.post('/find-zone', controller.findZone)
router.post('/in-zone/:name', controller.coordinateInZone)

module.exports = router