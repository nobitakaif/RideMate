import { t } from "elysia";

export namespace VehicleModel{
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
        availableLocation : t.Array(t.String())
    })
    export type AddVehicleSchema = typeof addVehicleSchema.static

    export const addVehicleSuccess = t.Object({
        success: t.Boolean(),
        msg: t.String()
    })
    export type AddVehicleSuccess = typeof addVehicleSuccess.static

    export const addVehicleFailed = t.Object({
        success: t.Literal(false),
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
        success: t.Literal(true),
        msg: t.String()
    })
    export type AddVehiclePhotoSuccess = typeof addVehiclePhotoSuccess.static

    export const addVehiclePhotoFailed = t.Object({
        success: t.Literal(false),
        error: t.String()
    })
    export type AddVehiclePhotoFailed = typeof addVehiclePhotoFailed.static

    export const myVehicleListSchema = t.Object({
        userId : t.String()
    })
    export type MyVehicleLIstSchema = typeof myVehicleListSchema.static

    export const myVehicleListResponse = t.Object({
        list : t.Array(t.Any())          
    })
    export type MyVehicleListResponse = typeof myVehicleListResponse.static

    export const myVehicleListFailed = t.Object({
        error : t.String(),
        msg : t.String()
    })
    export type MyVehicleListFailed = typeof myVehicleListFailed.static
}