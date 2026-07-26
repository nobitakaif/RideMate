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
        success : t.Boolean(),
        msg : t.String()
    })
    export type AddVehicleSuccess = typeof addVehicleSuccess.static
    
    export const addVehicleFailed = t.Object({
        success : t.Boolean(),
        error : t.String()
    })
    export type AddVehicleFailed = typeof addVehicleFailed.static

}