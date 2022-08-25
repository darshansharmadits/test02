export type UserConversionInfoType = {
    [userId: number]: ConversionInfoByUserType
}

export type ConversionInfoByUserType = {
    [timeStamp: string]: {
        "impression": number,
        "conversion": number
    }
}