

import {Accuracy, getCurrentPositionAsync} from "expo-location"

export default async function getLocation(){

    const location=await getCurrentPositionAsync({
        accuracy: Accuracy.High,


            })

    return location

}