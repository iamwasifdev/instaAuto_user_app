import { ResponseCus, stopType } from "@/ts";
import { api } from "@/utils/axiosIntance";


export default async function getStops(stopName: string, lng: number, lat: number): Promise<ResponseCus<"stops", stopType[]>> {


    const res = await api.get<ResponseCus<"stops", stopType[]>>("/ride/search", {
        params: {

            
                query: stopName,
                lng,
                lat
            

        }
    })

    return res.data



}