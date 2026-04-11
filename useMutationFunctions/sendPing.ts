import { api } from "@/utils/axiosIntance";
import  type {routeIdDictionary} from "@/ts"

export default async function sendPing( destinationStopId:string,lng:number,lat:number):Promise<routeIdDictionary> {
    
    //    const { destinationStopId, pickupLat, pickupLng } = req.body

    const res=await api.post<{routeIdDictionary: routeIdDictionary}>("/ride/ping",{
        destinationStopId,
        pickupLat:lat,
        pickupLng:lng
    })
    return res.data.routeIdDictionary
}
