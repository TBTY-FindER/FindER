const axios = require("axios");
const cheerio = require("cheerio");
const City = require("./City")
const Hospital = require("./Hospital")
class AHS {
    constructor(){
    }
    
    async fetchHTML(url) {
        try {
          const { data } = await axios.get(url);
          return data;
        } catch (error) {
          console.error(`Error fetching ${url}`, error);
          throw error;
        }
    }
    parseTime(str) {
        const match = str.split(" ")
        if (match) {
          const hr = parseInt(match[0], 10);
          const min = parseInt(match[2], 10);
          if (!isNaN(hr) && !isNaN(min)) {
            return {hours: hr, minutes: min}
          }
        }
        return null;
    }
    async buildClasses(){
        const url =
        "https://www.albertahealthservices.ca/Webapps/WaitTimes/api/waittimes/";
    
        const data = await this.fetchHTML(url);
        let Cities = new Array()
        let Hospitals = new Array()
        for (const i in data){
            let CurrCity = new City(i,[])
            if (data[i].Urgent.length != 0){
              for (const j of data[i].Urgent){
                let parsedTime
                if (j.TimesUnavailable == false){
                    parsedTime = this.parseTime(j.WaitTime)
                }
                else{
                    parsedTime = Infinity
                }
    
                let newHospital = new Hospital(
                    j.Name,
                    j.Category,
                    parsedTime,
                    j.URL,
                    j.Note,
                    j.TimesUnavailable
                )
                Hospitals.push(newHospital)
                CurrCity.Hospitals.push(newHospital)
              }
            }
            for (const j of data[i].Emergency){
                let parsedTime
                if (j.TimesUnavailable == false){
                    parsedTime = this.parseTime(j.WaitTime)
                }
                else{
                    parsedTime = Infinity
                }
    
                let newHospital = new Hospital(
                    j.Name,
                    j.Category,
                    parsedTime,
                    j.URL,
                    j.Note,
                    j.TimesUnavailable
                )
                Hospitals.push(newHospital)
                CurrCity.Hospitals.push(newHospital)
            }
            Cities.push(CurrCity)
        }
        return Hospitals
    }
}

async function test() {
  const url =
    "https://www.albertahealthservices.ca/Webapps/WaitTimes/api/waittimes/";

  try {
    let map = new Map()
    const jsonData = await fetchHTML(url)
    console.log(jsonData)
    for (const i in jsonData){
      console.log(i)
      console.log()
      for (const obj of jsonData[i].Emergency) { // urgent also exists, im just prototyping to play around with time
        console.log(obj.Name)
        console.log("Wait time:", obj.WaitTime)
        if (obj.TimesUnavailable === false){ 
          let parsedTime = parseTime(obj.WaitTime)
          if (parsedTime != null) {
            const curr = new Date();
            curr.setHours(curr.getHours() + parsedTime.hours)
            curr.setMinutes(curr.getMinutes() + parsedTime.minutes)
            console.log("Current Time:", new Date().toLocaleTimeString())
            console.log("Estimated Time:", curr.toLocaleTimeString())
          }
        }
        else{
          console.log("No estimate available.")
        }
      }
      console.log()
    }
  } 
  catch (error) {
    console.error(error);}
}
module.exports = AHS
