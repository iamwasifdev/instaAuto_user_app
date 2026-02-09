import { useEffect, useState } from "react";


export default function useDebounce<T>(value:T,wait:number){

    const [debouncedValue,setDebouncedValue]=useState<T>(value)

    useEffect(()=>{
       const timeOut= setTimeout(()=>{setDebouncedValue(value)},wait)
        return ()=>{
            clearTimeout(timeOut)
        }
    },[value,wait])

    return debouncedValue
}