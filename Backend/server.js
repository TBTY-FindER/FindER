const express = require('express')
const cors = require('cors');
const routes = require('./routes');
const CronService = require('./Service/CronService');

const app = express()
app.use(cors());
const port = 3000

app.use('/api', routes); // Mount the routes on /api

app.listen(port, () => {
  console.log(`FindER server listening on port ${port}`)
  CronService.ExecCron();
})