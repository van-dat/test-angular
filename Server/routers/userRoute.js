const router = require('express').Router()
const controller = require('../controllers/UserController')
const {isAdmin, verifyToken} = require('../midderware/verifyToken')

router.post('/register', controller.createUser)
router.get('/',[verifyToken, isAdmin] ,controller.getUser)
router.get('/me/:id',[verifyToken],controller.getOneUser)
router.put('/:id',[verifyToken] ,controller.updateUser)
router.delete('/:id', [verifyToken, isAdmin], controller.deleteUser)
router.post('/login', controller.login)


module.exports = router