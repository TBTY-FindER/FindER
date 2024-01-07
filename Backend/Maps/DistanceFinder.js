require("dotenv").config();
const AHS = require("../AHS/AHS")
const {Client, LatLng} = require("@googlemaps/google-maps-services-js");
const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API_KEY
const client = new Client({});
const ahs = new AHS()
const HospitalLatLngs = require("./hospital_lat_lng.json")
testorigin = {
    lat: 53.5281882,
    long: -113.5301719
}

async function DistanceToEverything(origin){
    let hospitals;
    // hospitals = await ahs.buildClasses()
    // console.log(hospitals)
    let dest = []
    for (const i in HospitalLatLngs){
        dest.push({lat:HospitalLatLngs[i].lat,lng:HospitalLatLngs[i].lng})
    }
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
        console.log(res1.data)
        console.log(res2.data)
    }
    catch{
        (err) => {
            console.log(err)
        }
    }
    // dmatrixRequest = {
    //     params: {
    //         origins: [{lat: origin.lat,lng: origin.long}],
    //         destinations: dest.slice(0,dest.length/2),
    //         key: GOOGLE_MAPS_API
    //     },
    //     timeout:1000
    // }
    // client.distancematrix(
    //     dmatrixRequest
    // ).then((result) => {
    //   console.log(result.data)
    //   for (const i of result.data.rows){
    //     console.log(i.elements)
    //   }
    // }).catch((err) => {
    //     console.log(err)
    // });

}
DistanceToEverything(testorigin)
