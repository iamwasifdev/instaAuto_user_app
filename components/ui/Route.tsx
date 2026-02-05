import { lngLatType } from "@/ts";
import { MapPolylineProps, Polyline } from "react-native-maps";



export default function Route({...rest}:MapPolylineProps){

    return <Polyline  strokeWidth={3} {...rest}/>

}