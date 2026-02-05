

import {Accuracy, getCurrentPositionAsync} from "expo-location"

export default async function getLocation(){

    try {
        const location=await getCurrentPositionAsync({
        accuracy: Accuracy.High,


            })

    return location
    } catch  {
       return undefined
        
    }

    

}