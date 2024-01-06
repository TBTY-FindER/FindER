const HospitalVm = require("../ViewModel/HospitalVm")

const MockHospital = {
    GetMockHospitlals: function() {
        console.log("GetMockHospitlals");
        return [
            new HospitalVm("Peter Lougheed Centre", 25.3, 45),
            new HospitalVm("Cochrane Community Health Centre", 34, 20),
            new HospitalVm("University of Alberta Hospital", 53, 34),
            new HospitalVm("Grande Prairie Regional Hospital", 15, 53),
        ];
    }
}

module.exports = MockHospital;