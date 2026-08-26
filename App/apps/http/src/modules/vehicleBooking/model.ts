import { t } from "elysia";

export namespace VehicleBookingModel{
    export const makeBookingSchema = t.Object({
        vehicleId : t.String(),
        renterId : t.String(),
        stateAt : t.Any(),
        endAt : t.Any(),
        totalPrice : t.Number(),
    })
    export type MakeBookingSchema = typeof makeBookingSchema.static

    export const makeBookingSuccess = t.Object({
        success : t.Literal("success"),
        data : t.Object({
            vehicleId : t.String(),
            ownerName : t.String(),
            bookingId : t.String(),
            startedAt : t.String(), 
            endedAt : t.String(), 
            totalFare : t.Number(),
        })       
    })
    export type MakeBookingSuccess = typeof makeBookingSuccess.static

    export const makeBookingFailed = t.Object({
        success : t.Literal("failed"),
        msg : t.String(),
        error : t.Optional(t.Any()) 
    })
    export type MakeBookingFailed = typeof makeBookingFailed.static
}