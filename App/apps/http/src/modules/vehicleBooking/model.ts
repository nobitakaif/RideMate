import { t } from "elysia";

export namespace VehicleBookingModel{
    export const makeBookingSchema = t.Object({
        vehicleId : t.String(),
        stateAt : t.Any(),
        endAt : t.Any(),
        totalPrice : t.Number()
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

    export const acceptBookingSchema = t.Object({
        bookingId : t.String()
    })
    export type AcceptBookingSchema = typeof acceptBookingSchema.static

    export const acceptBookingSuccess = t.Object({
        success : t.Literal("success"),
        data : t.Object({
            bookingId : t.String(),
            status : t.Literal("ACCEPTED")
        })
    })
    export type AcceptBookingSuccess = typeof acceptBookingSuccess.static

    export const acceptBookingFailed = t.Object({
        success : t.Literal("failed"),
        msg : t.String(),
        error : t.Optional(t.Any())
    })
    export type AcceptBookingFailed = typeof acceptBookingFailed.static

    export const notification = t.Object({
        id : t.String(),
        bookingId : t.String(),
        type : t.String(),
        createdAt : t.String()
    })
    export const notificationsSuccess = t.Object({
        success : t.Literal("success"),
        notifications : t.Array(notification)
    })
    export type NotificationsSuccess = typeof notificationsSuccess.static
}