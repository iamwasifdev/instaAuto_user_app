import { ResponseCus, stopType } from "@/ts";
import getStops from "@/useQueyFunctions/getStops";
import gotError from "@/utils/error";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";


export default function useFetchStops(stopName: string | undefined, lng: number, lat: number) {
   



    const { data: stopsData, error, ...rest } = useQuery<ResponseCus<"stops", stopType[]>, unknown>({
        queryKey: ["stopSearch", stopName, lng, lat],
        queryFn: () => { return getStops(stopName as string, lng, lat) },
        enabled: !!stopName,
        retryDelay:300
    })


    const FetchError = axios.isAxiosError(error) ? { statusCode: error.response?.status ?? 909, error: gotError(error, "str").error } : undefined


    console.log("Error from the  custom hook: ", error)

    return { data: stopsData?.stops, error: FetchError, rest: { ...rest } }

}