const MockHospital = require("../Mock/MockHospitals");

const HospitalController = {
    getHospitals: function() {
        console.log("Get Hospitals");
        return MockHospital.GetMockHospitlals();
    }
};

module.exports = HospitalController;