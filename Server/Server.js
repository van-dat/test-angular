const express = require('express')
const config = require('./config/dbConnect')
require('./config/dbConnect')
require('dotenv').config()
const initRouter = require('./routers')
const cors = require('cors')

const port = process.env.PORT || 8888;
const app = express()
app.use(cors({
  origin : '*',
  methods : ['POST', 'GET', 'PUT', 'DELETE']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRouter(app)


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 