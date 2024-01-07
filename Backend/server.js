const express = require('express')
const cors = require('cors');
const routes = require('./routes');
const CronService = require('./Service/CronService');

const app = express()
app.use(cors());
const port = 3000

app.use('/api', routes); // Mount the routes on /api

function startServer() {
  CronService.ExecCron()
  .then(() => {
    app.listen(port, () => {
      console.log(`Done Init CRON`)
    })
  })
}

startServer();

