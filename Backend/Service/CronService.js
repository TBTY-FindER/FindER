const Constants = require("../constants");

const CronService = {
    UpdateParams: async function() {
        console.log("Ran the cron")
    },

    ExecCron: function() {
        setInterval(this.UpdateParams, Constants.updateWaitTimesInterval);
    }
};

module.exports = CronService;