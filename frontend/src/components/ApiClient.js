
const serverUrl = "http://localhost:3000";

const ApiClient = {
    GetRecommendation: async function(person) {
        let reqBody = JSON.stringify({
            "lat": person.address.lat,
            "lng": person.address.lng,
            "age": person.age,
            "situation": person.situation,
            "gender": person.gender,
          });
          var requestOptions = {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(reqBody),
          };
          let resp = await fetch(`${serverUrl}/api/hospitals/recommend`, requestOptions)
          if (!resp.ok) {
            console.log("Couldn't get hospitals") // TODO Handle
            return [];
          }
          
          const data = await response.json();
          console.log(JSON.stringify(data));
          return data.body;
    }
};

export default ApiClient;