const MockHospital = require("../Mock/MockHospitals");
const HospitalService = require("../Service/HospitalService");
const HospitalVm = require("../ViewModel/HospitalVm");

const HospitalController = {
    getHospitals: function() {
        let hospitalCache = HospitalService.hospitalsCache;
        return HospitalService.mapHospitalLocal(hospitalCache, {});
    }
};

module.exports = HospitalController;