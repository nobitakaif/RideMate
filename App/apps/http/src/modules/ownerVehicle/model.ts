import { t } from "elysia";

export namespace OwnerVehicleModel{
    export const addVehicleSchema = t.Object({
        type : t.UnionEnum(['BIKE', 'CAR', 'OTHER']),
        brand : t.String({maxLength : 40}),
        model : t.String({maxLength : 40}),
        purchaseYear : t.String({format : "date-time"}),
        registrationNumber : t.String({maxLength : 40}),
        yearOld : t.Number({maximum : 100}),
        pricePerHour : t.Number({minimum : 1, maximum : 100000}),
        pricePerDay : t.Number({minimum : 100, maximum : 100000000}),
        gpsEnabled : t.Boolean(),
        simNumber : t.Optional(t.Number()),
        imeiNumber : t.Optional(t.Number()),
        deviceId : t.Optional(t.String()),
        provider : t.Optional(t.Number()),
        images : t.Optional(t.Array(t.String())),
        description : t.Optional(t.String()),
        availableLocation : t.Array(t.String()),
        fuel : t.UnionEnum(['ELECTRIC', 'GAS', 'FUEL']),
        currentState : t.UnionEnum(['AVAILABLE', 'BOOKED'])
    })
    export type AddVehicleSchema = typeof addVehicleSchema.static

    export const addVehicleSuccess = t.Object({
        success: t.Literal("success"),
        msg: t.String()
    })
    export type AddVehicleSuccess = typeof addVehicleSuccess.static

    export const addVehicleFailed = t.Object({
        success: t.Literal('failed'),
        error: t.String()
        })
    export type AddVehicleFailed = typeof addVehicleFailed.static

    export const addVehiclePhoto = t.Object({
        photo : t.Optional(t.Array(t.File(),{maxItems : 10})),
        url : t.String(),
        vehicleId : t.String()
    })
    export type AddVehiclePhoto = typeof addVehiclePhoto.static

    export const addVehiclePhotoSuccess = t.Object({
        success: t.Literal('success'),
        msg: t.String()
    })
    export type AddVehiclePhotoSuccess = typeof addVehiclePhotoSuccess.static

    export const addVehiclePhotoFailed = t.Object({
        success: t.Literal('failed'),
        error: t.String()
    })
    export type AddVehiclePhotoFailed = typeof addVehiclePhotoFailed.static

    
    

    export const getAllOwnerVehicleSchema  = t.Object({
        userId : t.String()
    })
    export type GetALllOwnerVehicleSchema = typeof getAllOwnerVehicleSchema.static

    export const getAllOwnerVehicleSuccess = t.Object({
        success : t.Literal("success"),
        list : t.Array(t.Object({
            id : t.String(), 
            brand : t.String(),
            name : t.String(),
            pricePerDay : t.Number(),
            pricePerHour : t.Number(),
            description : t.Optional(t.Any()),
            fuel : t.UnionEnum(['ELECTRIC', 'FUEL', 'GAS']),
            images : t.Any(),
            feedback : t.Optional(t.Any()),
            model : t.String(),
            type : t.UnionEnum(['BIKE', 'CAR', 'OTHER']),
            registrationNumber : t.Optional(t.Any()),
            listedDate : t.Any(),
            gps : t.Optional(t.Any())
        }))
    })
    export type GetAllOwnerVehicleSuccess = typeof getAllOwnerVehicleSuccess.static

    export const getAllOwnerVehicleFailed = t.Object({
        success : t.Literal('failed'),
        msg : t.String(),
        error : t.Optional(t.Any())
    })
    export type GetAllOwnerVehicleFailed = typeof getAllOwnerVehicleFailed.static
}