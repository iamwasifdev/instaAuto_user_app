import { boolean, success } from "zod"




export type authMeEndpoint={
    name:string,
    phoneNumber:string,
    countryCode:string,
    id:string
}


export type otpSendSuccess={
    success:boolean
    message:string
}

export type otpSendError={
    success:boolean
    error:string|any
}


export type otpVerifySuccess={
    success:boolean,
    newUser:boolean,
    token:string,
    userData?:authMeEndpoint
}


export type sendUserCredentialsType ={
    token:string,
    name:string,
    phoneNumber:string,
    countryCode:string,
    
}


export type driverMarker={
    type:"driver",
    driverId:ObjectId,
    autoNumber:string,
    name:string,
    lng:number,
    lat:number,
    heading:number,
    routeId:string
}


export type joinGrid={
    lng:number,
    lat:number,
    type:"user"|"driver",
    id:string //user or driver id
   
}



export type driveMovedType={
    type:"driver",
    driverId:ObjectId,
    autoNumber:string,
    name:string,
    lng:number,
    lat:number,
    heading:number,
    routeId:string
}

export type stopType= {
  name: string;
  _id:string
  // Updated Interface to match GeoJSON
  location: {
    type: string;
    coordinates: number[]; // [lng, lat]
  };
  stateCountry:string
}

export type routeType={

    name: string;
  stops: stopType[];
  startLocation: {
    type: string;
    coordinates: number[];
  };

}


export type lngLatType={
    latitude:number,
    longitude:number
}

export type ListData={
    name:string,
    id:string
}

export  type ResponseCus<K extends string,T>= {
    success:boolean
  
}&{
      [P in K]:T
}

export type  MarkerType=DriverType

