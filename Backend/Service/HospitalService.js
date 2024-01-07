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
    getEstimateSeconds: function(WaitTime,TravelTime){
        let currentTimeInSeconds = new Date().getTime() / 1000;
        return (currentTimeInSeconds + WaitTime + TravelTime)
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
            hospitalVm.setDistance(distanceDurationObject[hospLoc.name].distance)
            hospitalVm.setDuration(distanceDurationObject[hospLoc.name].duration)
            let waitTimeInSeconds = (hospLoc.waitTime.hours*3600) + (hospLoc.waitTime.minutes*60) 
            let total = this.getEstimateSeconds(waitTimeInSeconds,distanceDurationObject[hospLoc.name].duration.value)
            hospitalVm.setTotalTime(total)
            return hospitalVm
        })
    },

    getRecommendationForUrgent: async function(lat, long) {
        let matrix = await DistanceFinder.DistanceToEverything({lat:lat,long:long})
        console.log(matrix)
        console.log(Date.now())
        let hospitals = this.mapHospitalLocal(this.hospitalsCache, matrix)
        // console.log(a)
        hospitals.sort((a, b) => (a.distance.value) - (b.distance.value));
        console.log(hospitals[0])
        return hospitals;
    },

    getRecommendationForNonUrgent: async function(lat,long){
        let matrix = await DistanceFinder.DistanceToEverything({lat:lat,long:long})
        let hospitals = this.mapHospitalLocal(this.hospitalsCache, matrix)
        hospitals.sort((a, b) => (a.totalTime) - (b.totalTime));
        return hospitals
    }
};


module.exports = HospitalService;