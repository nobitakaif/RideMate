import { prisma } from "@repo/db";
import { VehicleBookingModel } from "./model";

export abstract class BookingService {
    static async makeBooking(body: VehicleBookingModel.MakeBookingSchema, {userId} : {userId : string}): Promise<VehicleBookingModel.MakeBookingSuccess | VehicleBookingModel.MakeBookingFailed> {
        try {
            
            // TODO : is vehicle already booked or not by someone else 
            
            const res = await prisma.booking.create({
                data: {
                    startAt: body.stateAt,
                    endAt: body.endAt,
                    status: 'PENDING',
                    totalPrice: body.totalPrice,
                    renterId: userId,
                    vehicleId: body.vehicleId,
                    notifications: {
                        create: {
                            userId: (await prisma.vehicle.findUniqueOrThrow({
                                where: { id: body.vehicleId },
                                select: { ownerId: true }
                            })).ownerId,
                            type: "BOOKING_REQUEST"
                        }
                    }
                },
                select: {
                    vehicle: {
                        select: {
                            id: true,
                            owner: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    id: true,
                    endAt: true,
                    startAt: true,
                    totalPrice: true,
                    status: true
                }
            })

            if (!res) {
                return {
                    success: "failed",
                    msg: "your booking is not confirmed",
                    error: "something went wrong!"
                }
            }
            return {
                success: "success",
                data: {
                    bookingId: res.id,
                    endedAt: res.endAt.toString(),
                    ownerName: res.vehicle.owner.name ?? "User",
                    startedAt: res.startAt.toString(),
                    totalFare: res.totalPrice.toNumber(),
                    vehicleId: res.vehicle.id
                }
            }
        }
        catch (e) {
            return {
                success: "failed",
                msg: "something went wrong!",
                error: e
            }
        }
    }

    
    static async getNotifications(userId: string): Promise<VehicleBookingModel.NotificationsSuccess | VehicleBookingModel.NotificationFailed> {
        try {
            const notifications = await prisma.notification.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
                select: { id: true, bookingId: true, type: true, createdAt: true }
            })

            return {
                success: "success",
                notifications: notifications.map((notification) => ({
                    ...notification,
                    type: notification.type.toString(),
                    createdAt: notification.createdAt.toISOString()
                }))
            }
        } catch (e) {
            return {
                success: "failed",
                msg: "something went wrong!",
                error: e
            }
        }
    }

    static async getMyAllBooking ({ userId } : VehicleBookingModel.GetMyAllBookingSchema) : Promise<VehicleBookingModel.GetMyAllBookingSuccess | VehicleBookingModel.GetMyAllBookingFailed>{
        try{
            const res = await prisma.booking.findMany({
                where : {
                    renterId : userId
                },
                select : {
                    vehicle : {
                        select : {
                            images : true,
                            fuel : true,
                            description : true,
                        }
                    },
                    totalPrice : true,
                    status : true,
                    endAt : true,
                    startAt : true,
                    createdAt : true,
                    reviews : true
                }
            })
            if(!res || res.length == 0){
                return {
                    success : "failed",
                    msg : "you don't have any bookings yet!"
                }
            }
            return {
                success : "success",
                allBookings : res.map((b) =>{
                    return {
                        vehicleImg : b.vehicle.images,
                        fuel : b.vehicle.fuel,
                        description : b.vehicle.description,
                        totalPrice : b.totalPrice,
                        status : b.status,
                        startAt : b.startAt,
                        end : b.endAt,
                        createdAt : b.createdAt,
                        reviews : b.reviews
                    }
                })
            }
        }catch(e){
            return {
                success : "failed",
                error : e,
                msg : "something went wrong!"
            }
        }
    }

    static async getMyBooking ({ bookingId } : VehicleBookingModel.GetMyBookingSchema) : Promise<VehicleBookingModel.GetMyBookingSuccess | VehicleBookingModel.GetMyBookingFailed>{
        try{
            const res = await prisma.booking.findFirst({
                where : {
                    id : bookingId
                },
                select : {
                    reviews : true,
                    incident : true,
                    totalPrice : true,
                    startAt : true,
                    endAt : true,
                    vehicle : {
                        select : {
                            feedback : true,
                            brand : true,
                            description : true,
                            gpsEnabled : true,
                            images : true,
                            owner  :{
                                select : {
                                    name : true,
                                }
                            },
                            model : true,
                            status : true,
                            yearOld : true
                        }
                    }
                }
            })
            if(!res){
                return {
                    success : "failed",
                    msg : "incorrect bookingId" 
                }
            }
            return {
                success : "success",
                booking  : {
                    endAt : res.endAt, 
                    startAt : res.startAt,
                    reviews : res.reviews,
                    vehicle : {
                        brand : res.vehicle.brand,
                        description : res.vehicle.description,
                        feedback : res.vehicle.feedback,
                        gpsEnabled : res.vehicle.gpsEnabled,
                        images : res.vehicle.images,
                        model : res.vehicle.model,
                        ownerName : res.vehicle.owner.name,
                        status : res.vehicle.status,
                        yearOld : res.vehicle.yearOld,
                    },
                    incident : res.incident,
                    totalPrice : res.totalPrice
                }
            }
        }catch(e){
            return {
                success : "failed",
                error : e,
                msg : "something went wrong1"
            }
        }
    }

}