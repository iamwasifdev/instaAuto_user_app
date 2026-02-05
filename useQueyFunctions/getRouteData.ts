import { routeType } from "@/ts";
import { api } from "@/utils/axiosIntance";


export default async function getRouteData(routeId:string):Promise<routeType>{


    const res=await api.get<{route:routeType,success:boolean}>(`/routes/Oneroute/${routeId}`)

    return res.data.route


    
}