const MockHospital = require("../Mock/MockHospitals");
const HospitalService = require("../Service/HospitalService");
const HospitalVm = require("../ViewModel/HospitalVm");

const HospitalController = {
    getHospitals: function() {
        let lat = 53.523220;
        let long = -113.526321;
        let hospitalCache = HospitalService.hospitalsCache;
        // console.log(JSON.stringify())
        // return HospitalService.mapHospitalLocal(hospitalCache, {});
        return hospitalCache;
    },

    getRecommendation: async function(req) {
        let recommendationReq = req.body;
        let recommendHospitals = await HospitalService.getRecommendationForNonUrgent(lat, long);
        return recommendHospitals
    }
};

module.exports = HospitalController;