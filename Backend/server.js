const express = require('express')
const routes = require('./routes');

const app = express()
const port = 3000

app.use('/api', routes); // Mount the routes on /api

app.listen(port, () => {
  console.log(`FindER server listening on port ${port}`)
})