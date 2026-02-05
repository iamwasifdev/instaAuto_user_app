import { MapMarkerProps, Marker } from "react-native-maps";
import { LucideIcon } from 'lucide-react-native';


interface IconMarkerType extends Omit<MapMarkerProps,"coordinate"> {

  lng: number;
  lat: number;
  text: string;
  LucideIcon:LucideIcon
  size?:number

}

export default function IconMarker({lng,lat,text,LucideIcon,size=28,...rest}:IconMarkerType){

    return <Marker coordinate={{
       latitude: lat,
       longitude: lng,
      }}
      title={text}
      >
        <LucideIcon  size={size}/>
    </Marker>

}