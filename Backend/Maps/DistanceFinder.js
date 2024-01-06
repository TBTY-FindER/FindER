const AHS = require("../AHS/AHS")
const {Client, LatLng} = require("@googlemaps/google-maps-services-js");
const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API_KEY
const client = new Client({});
const ahs = new AHS()

testorigin = {
    lat: 53.5281882,
    long: -113.5301719
}

function getHospitalLatLng(destinations){
    
} 

async function DistanceToEverything(origin){
    let hospitals;
    hospitals = await ahs.buildClasses()
    // console.log(hospitals)
    let arrs = []
    for (const i of hospitals){
        arrs.push(i.Name)
    }
    dmatrixRequest = {
        params: {
            origins: [{lat: origin.lat,long: origin.long}],
            destinations: arrs,
            key: GOOGLE_MAPS_API
        },
        timeout:1000
    }
    client.distancematrix(
        dmatrixRequest
    ).then((result) => {
      console.log(result.data)
    }).catch((err) => {
        console.log(err)
    });

}
DistanceToEverything(testorigin)
