import { prisma } from "@repo/db";
import { VehicleBookingModel } from "./model";

export abstract class BookingService {
    static async makeBooking(body : VehicleBookingModel.MakeBookingSchema ):Promise<VehicleBookingModel.MakeBookingSuccess | VehicleBookingModel.MakeBookingFailed>{
        try{
            const res  = await prisma.booking.create({
                data : {
                    startAt : body.stateAt,
                    endAt : body.endAt,
                    status : 'PENDING',
                    totalPrice : body.totalPrice,
                    renterId : body.renterId,
                    vehicleId : body.vehicleId,
                    notifications : {
                        create : {
                            userId : (await prisma.vehicle.findUniqueOrThrow({
                                where : { id : body.vehicleId },
                                select : { ownerId : true }
                            })).ownerId,
                            type : "BOOKING_REQUEST"
                        }
                    }
                },
                select : {
                    vehicle : {
                        select : {
                            id : true,
                            owner : {
                                select : {
                                    name : true
                                }
                            }
                        }
                    },
                    id : true,
                    endAt : true,
                    startAt : true,
                    totalPrice : true,
                    status : true
                }
            })

            

            if(res.status == "PENDING"){
                
            }
            
            if(!res){
                return {
                    success : "failed",
                    msg : "your booking is not confirmed",
                    error : "something went wrong!"
                }
            }
            return {
                success : "success",
                data : {
                    bookingId : res.id,
                    endedAt : res.endAt.toString(),
                    ownerName : res.vehicle.owner.name ?? "User",
                    startedAt : res.startAt.toString(),
                    totalFare : res.totalPrice.toNumber(),
                    vehicleId : res.vehicle.id
                }
            }
        }
        catch(e){
            return {
                success : "failed",
                msg : "something went wrong!",
                error : e
            }
        }
    }

    static async acceptBooking({ bookingId, ownerId } : { bookingId : string, ownerId : string }): Promise<VehicleBookingModel.AcceptBookingSuccess | VehicleBookingModel.AcceptBookingFailed>{
        try{
            const result = await prisma.$transaction(async (transaction) => {
                const updated = await transaction.booking.updateMany({
                    where : {
                        id : bookingId,
                        status : "PENDING",
                        vehicle : { ownerId }
                    },
                    data : { status : "APPROVED" }
                })

                if(updated.count === 0){
                    return null
                }

                const booking = await transaction.booking.findUniqueOrThrow({
                    where : { id : bookingId },
                    select : { renterId : true }
                })

                await transaction.notification.create({
                    data : {
                        userId : booking.renterId,
                        bookingId,
                        type : "BOOKING_ACCEPTED"
                    }
                })

                return booking
            })

            if(!result){
                return {
                    success : "failed",
                    msg : "booking was not found, already accepted, or you do not own the vehicle"
                }
            }

            return {
                success : "success",
                data : { bookingId, status : "ACCEPTED" }
            }
        }catch(e){
            return {
                success : "failed",
                msg : "something went wrong!",
                error : e
            }
        }
    }

    static async getNotifications(userId : string): Promise<VehicleBookingModel.NotificationsSuccess | VehicleBookingModel.AcceptBookingFailed>{
        try{
            const notifications = await prisma.notification.findMany({
                where : { userId },
                orderBy : { createdAt : "desc" },
                select : { id : true, bookingId : true, type : true, createdAt : true }
            })

            return {
                success : "success",
                notifications : notifications.map((notification) => ({
                    ...notification,
                    type : notification.type.toString(),
                    createdAt : notification.createdAt.toISOString()
                }))
            }
        }catch(e){
            return {
                success : "failed",
                msg : "something went wrong!",
                error : e
            }
        }
    }


    
}