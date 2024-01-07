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

    getRecommendation: async function() {
        // let lat = 52.268112;
        // let long = -113.811241;
        // let lat = 53.523220;
        // let long = -113.526321;
        let lat = 52.269001
        let long = -113.809013
        let recommendHospitals = await HospitalService.getRecommendationForNonUrgent(lat, long);
        return recommendHospitals
    }
};

module.exports = HospitalController;