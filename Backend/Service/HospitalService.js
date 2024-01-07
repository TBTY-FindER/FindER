const AHS = require("../AHS/AHS");
const HospitalMetadata = require("../AHS/hospital_info.json");
const HospitalLocal = require("../Model/HospitalLocal");
const HospitalVm = require("../ViewModel/HospitalVm");

let Ahs = new AHS()

const HospitalService = {
    hospitalsCache: [],

    updateHospitalsCache: async function() {
        let hoptitalInfo = await Ahs.buildClasses();
        this.initCache(hoptitalInfo);
    },

    // inits the cache with the metadata
    initCache: function(hoptitalInfo) {
        this.hospitalsCache.length = 0;
        for (let hospInfo of hoptitalInfo) {
            let hospName = hospInfo.Name;
            let hospMeta = HospitalMetadata[hospName];
            if (!hospMeta) { console.log("Missing Hospital: " + hospName); continue; }
            this.hospitalsCache.push(new HospitalLocal(hospName, hospInfo.WaitTime, hospInfo.Note, hospMeta.type, hospMeta.city, hospMeta.phone, 
                hospMeta.address, hospMeta.website, hospMeta.availability, hospMeta.age, hospMeta.services));
        }
    },

    mapHospitalLocal(hospitalCache, hospitalDistTime) {
        return hospitalCache.map(hospLoc => {
            return new HospitalVm(hospLoc.name, 10, 8, hospitalCache.note, hospitalCache.type, hospitalCache.city, hospitalCache.phone, hospitalCache.address, hospitalCache.website, hospitalCache.availability, 
                hospitalCache.age, hospitalCache.services);
        })
    },

    getRecommendation: async function(lat, long) {
        return [];
    }
};

module.exports = HospitalService;