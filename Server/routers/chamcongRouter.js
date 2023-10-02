const router = require('express').Router()
const controller = require('../controllers/ChamcongController')
const { isAdmin, verifyToken } = require('../midderware/verifyToken')

router.post('/',[verifyToken] ,controller.Chamcongct)
router.get('/',controller.getChamcong)
router.get('/me/:id',[verifyToken],controller.getChamcongUser)






module.exports = router