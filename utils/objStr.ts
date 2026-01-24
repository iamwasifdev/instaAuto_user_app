

export default function objStr<T extends Record<string,any>>(obj:T,mode:"space"|"line"="space"){

    let str=""

    Object.entries(obj).forEach(([key,message])=>{

        str=message+(mode==="space"?" ":"/n")
    })

    return str

}