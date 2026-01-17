

export type authMeEndpoint={
    name:string,
    number:string,
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
