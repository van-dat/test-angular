const router = require('express').Router()
const controller = require('../controllers/RoleController')
const { isAdmin, verifyToken } = require('../midderware/verifyToken')

router.post('/create', [verifyToken, isAdmin], controller.createRole)
router.put('/:id', [verifyToken, isAdmin], controller.updateRole)





module.exports = router