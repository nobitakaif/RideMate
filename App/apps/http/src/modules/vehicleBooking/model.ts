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

    export const  getMyAllBookingSchema = t.Object({
        userId : t.String()
    })
    export type GetMyAllBookingSchema = typeof getMyAllBookingSchema.static

    export const getMyAllBookingSuccess = t.Object({
        success : t.Literal("success"),
        allBookings : t.Array(t.Any())
    })
    export type GetMyAllBookingSuccess = typeof getMyAllBookingSuccess.static

    export const getMyAllBookingFailed = t.Object({
        success : t.Literal("failed"),
        msg : t.String(),
        error : t.Optional(t.Any())
    })
    export type GetMyAllBookingFailed = typeof getMyAllBookingFailed.static

    export const getMyBookingSchema = t.Object({
        bookingId : t.String()
    })
    export type GetMyBookingSchema = typeof getMyBookingSchema.static

    export const getMyBookingSuccess = t.Object({
        success : t.Literal("success"),
        booking : t.Object({
            reviews : t.Any(),
            incident : t.Any(),
            totalPrice : t.Any(),
            startAt : t.Any(),
            endAt : t.Any(),
            vehicle : t.Object({    
                feedback : t.Any(),
                brand : t.Any(),
                description : t.Any(),
                gpsEnabled : t.Any(),
                images : t.Any(),
                ownerName : t.Any(),
                model : t.Any(),
                status : t.Any(),
                yearOld : t.Any()
            })
        })
    })
    
    export type GetMyBookingSuccess = typeof getMyBookingSuccess.static

    export const getMyBookingFailed = t.Object({
        success : t.Literal("failed"),
        error : t.Optional(t.Any()),
        msg : t.String(),
    })
    export type GetMyBookingFailed = typeof getMyBookingFailed.static
}