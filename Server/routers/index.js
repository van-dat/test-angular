const userRoute = require('./userRoute')
const roleRoute = require('./roleRoute')
const chamcongRoute =require('./chamcongRouter')
const initRouter = (app) => {
  app.use('/api/user', userRoute)
  app.use('/api/role', roleRoute)
  app.use('/api/chamcong', chamcongRoute)


}

module.exports = initRouter
