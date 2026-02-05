import { routeType,lngLatType } from "@/ts";



export default function getCoordinates(route:routeType){
    let stopsGiven:Record<string,number|string>[]=[]
    let coordinates:lngLatType[]=[]

    console.log("stop:",route.stops)

  route.stops.forEach((stop)=>{
    coordinates.push({longitude:stop.location.coordinates[0],latitude:stop.location.coordinates[1]})
    stopsGiven.push({longitude:stop.location.coordinates[0],latitude:stop.location.coordinates[1],name:stop.name})
  })

  return{stopsGiven,coordinates}


}