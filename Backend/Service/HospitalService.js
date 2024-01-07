const AHS = require("../AHS/AHS");
const HospitalMetadata = require("../AHS/hospital_info.json");
const HospitalLocal = require("../Model/HospitalLocal");
const HospitalVm = require("../ViewModel/HospitalVm");
const DistanceFinder = require("../Maps/DistanceFinder")
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

    mapHospitalLocal(hospitalCache, distanceDurationObject) {
        return hospitalCache.map(hospLoc => {
            let hospitalVm = new HospitalVm(hospLoc.name, hospLoc.waitTime, hospLoc.note, hospLoc.type, hospLoc.city, hospLoc.phone, hospLoc.address, hospLoc.website, hospLoc.availability, 
                hospLoc.age, hospLoc.services);
            // console.log(hospitalVm)
            hospitalVm.setDistance(distanceDurationObject[hospLoc.name].distance.value)
            hospitalVm.setDuration(distanceDurationObject[hospLoc.name].duration.value)
            
            return hospitalVm
        })
    },

    getRecommendationForUrgent: async function(lat, long) {
        let matrix = await DistanceFinder.DistanceToEverything({lat:lat,long:long})
        // console.log(matrix)
        let hospitals = this.mapHospitalLocal(this.hospitalsCache, matrix)
        // console.log(a)
        hospitals.sort((a, b) => parseFloat(a.distance) - (b.distance));
        return hospitals;
    }
};

module.exports = HospitalService;