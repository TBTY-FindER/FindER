const MockHospital = require("../Mock/MockHospitals");
const HospitalService = require("../Service/HospitalService");
const HospitalVm = require("../ViewModel/HospitalVm");
const RecommendationReq = require("../ViewModel/RecommendReq");

const HospitalController = {
    getHospitals: function() {
        let hospitalCache = HospitalService.hospitalsCache;
        return hospitalCache;
    },

    getRecommendation: async function(req) {
        let recommendationReq = new RecommendationReq(req.body.age, req.body.situation, req.body.gender, req.body.lat, req.body.lng);
        console.log(JSON.stringify(recommendationReq))
        let recommendHospitals = await HospitalService.getRecommendation(recommendationReq);
        return recommendHospitals
    }
};

module.exports = HospitalController;