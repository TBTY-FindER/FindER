require("dotenv").config();
const AHS = require("../AHS/AHS")
const {Client, LatLng} = require("@googlemaps/google-maps-services-js");
const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API_KEY
const client = new Client({});
const ahs = new AHS()
const HospitalLatLngs = require("./hospital_lat_lng.json")
async function DistanceToEverything(origin){
    let hospitals = [];
    // hospitals = await ahs.buildClasses()
    // console.log(hospitals)
    let dest = []
    for (const i in HospitalLatLngs){
        hospitals.push(i)
        dest.push({lat:HospitalLatLngs[i].lat,lng:HospitalLatLngs[i].lng})
    }
    // console.log(hospitals)
    const half = Math.ceil(dest.length/2)
    const requests = [
        client.distancematrix({
            params: {
                origins: [{ lat: origin.lat, lng: origin.long }],
                destinations: dest.slice(0, half),
                key: GOOGLE_MAPS_API
            },
            timeout: 1000
        }),

        client.distancematrix({
            params: {
                origins: [{ lat: origin.lat, lng: origin.long }],
                destinations: dest.slice(half),
                key: GOOGLE_MAPS_API
            },
            timeout: 1000
        })
    ];
    try{
        const [res1,res2] = await Promise.all(requests)
        let hospitalDists = res1.data.rows[0].elements.concat(res2.data.rows[0].elements)
        // console.log(hospitalDists.length)
        // console.log(hospitalDists)
        return [hospitals,hospitalDists]
    }
    catch{
        (err) => {
            console.log(err)
        }
    }
}
testorigin = {
    lat: 53.5281882,
    long: -113.5301719
}
DistanceToEverything(testorigin).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
});
