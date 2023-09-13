import moment from 'moment/moment'
const today=moment().add('days', -3).format("YYYY-MM-DD");
const tomorrow=moment().add('days', 1).format("YYYY-MM-DD");
const BASE_URL="https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=2.45&starttime="+today+"&endtime="+tomorrow
//const BASE_URL="https://raw.githubusercontent.com/fabioohara/json/main/sismos.json"
export const getDataFromSismo =async(url=BASE_URL)=>{
//{console.log("HOY: "+hoy)}
  
    try{
        const response= await fetch(url)
        const data= await response.json()
        console.log(tomorrow)
        return data
    }catch (error){
       // console.log(error.message);
    }
}
