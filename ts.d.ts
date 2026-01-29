



export type authMeEndpoint={
    name:string,
    phoneNumber:string,
    countryCode:string,
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
    routerId:ObjectId
}

export type  MarkerType=DriverType

