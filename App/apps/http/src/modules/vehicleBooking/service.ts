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
                    vehicleId : body.vehicleId
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
                    totalPrice : true
                }
            })
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
    
}