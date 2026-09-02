import { prisma } from "@repo/db";
import { OwnerVehicleModel } from "./model";

export abstract class OwnerVehicleService{
    static async addVehicle({ body, ownerId,  } : {body : OwnerVehicleModel.AddVehicleSchema, ownerId : string}) : Promise<OwnerVehicleModel.AddVehicleSuccess | OwnerVehicleModel.AddVehicleFailed>{

        try{
            const vehicle = await prisma.vehicle.create({
                data : {
                    brand : body.brand,
                    model : body.model,
                    pricePerDay : body.pricePerDay, 
                    pricePerHour : body.pricePerHour,
                    type : body.type,
                    availableLocation : body.availableLocation,
                    ownerId : ownerId,
                    gpsEnabled : body.gpsEnabled,
                    purchasedYear : body.purchaseYear,
                    yearOld : body.yearOld,
                    fuel : body.fuel,
                    currentState : body.currentState
                }
            })
            if(!vehicle.id){
                return {
                    success : "failed",
                    error : "something went wrong, please try again!" 
                }
            }
            return {
                success :'success',
                msg : "your vehicle is successfully added"
            }
        }catch(e){
            console.log("error -> ",e)
            return {
                success : 'failed',
                error : "something went wrong!"
            }
        }
    }

    static async uploadVehiclePhoto ({ vehicleId, url } : OwnerVehicleModel.AddVehiclePhoto) : Promise<OwnerVehicleModel.AddVehiclePhotoSuccess | OwnerVehicleModel.AddVehiclePhotoFailed> {
        try{
            const res = await prisma.vehicleImages.create({
                data : {
                    vehicleId : vehicleId,
                    imageUrl : url,
                }
            })
            return {
                success : 'success',
                msg : "photo uploaded"
            }
        }catch(e : any){
            return {
                error : e,
                success : 'failed'
            }
        }
    }

    static async getAllOwnerVehicle({ userId }: OwnerVehicleModel.GetALllOwnerVehicleSchema) : Promise<OwnerVehicleModel.GetAllOwnerVehicleSuccess | OwnerVehicleModel.GetAllOwnerVehicleFailed>{
        try{
            const allVehicle = await prisma.vehicle.findMany({
                where : {
                    ownerId : userId
                },
                select : {
                    id : true,
                    brand : true,
                    name : true,
                    description : true,
                    pricePerDay : true,
                    pricePerHour : true,
                    fuel : true,
                    images : true,
                    model : true,
                    registrationNumber : true,
                    createdAt : true,
                    gpsDevice : true,
                    feedback : true,
                    type : true
                }
            })
            if(!allVehicle){
                return {
                    success : "failed",
                    msg : "You didn't added any vehicle yet!"
                }
            }
            return {
                success : 'success',
                list : allVehicle.map(( x ) =>{
                    return {
                        brand : x.brand,
                        description : x.description,
                        feedback : x.feedback,
                        fuel : x.fuel,
                        id : x.id,
                        images : x.images,
                        listedDate : x.createdAt,
                        model : x.model,
                        name : x.name,
                        pricePerDay : x.pricePerDay,
                        pricePerHour : x.pricePerHour,
                        gps : x.gpsDevice,
                        registrationNumber : x.registrationNumber,
                        type : x.type
                    }
                })
            }
        }catch(e){
            return {
                success : "failed",
                msg : "something went wrong!",
                error : e
            }
        }
    }
    static async getVehicleById({ vehicleId }:OwnerVehicleModel.GetVehicleByIdSchema) : Promise<OwnerVehicleModel.GetVehicleByIdSuccess | OwnerVehicleModel.GetVehicleByIdFailed>{
        try{
            const res = await prisma.vehicle.findFirst({
                where : {
                    id : vehicleId
                },
                select : {
                    brand : true,
                    name : true,
                    description : true,
                    pricePerDay : true,
                    pricePerHour : true,
                    fuel : true,
                    images : true,
                    model : true,
                    registrationNumber : true,
                    createdAt : true,
                    gpsDevice : true,
                    feedback : true,
                    type : true
                }
            })

            if(!res){
                return {
                    success : "failed",
                    msg : "incorrect vehicle Id"
                }
            }
            return {
                success : "success",
                vehicle : {
                    brand : res.brand,
                    description : res.description,
                    feedback : res.feedback,
                    fuel : res.fuel,
                    images : res.images,
                    listedDate : res.createdAt,
                    model : res.model,
                    name : res.name,
                    pricePerDay : res.pricePerDay,
                    pricePerHour : res.pricePerHour,
                    gps : res.gpsDevice,
                    registrationNumber : res.registrationNumber,
                    type : res.type
                }
            }
        }catch(e){
            return {
                success : "failed",
                msg : "Something went wrong!",
                error : e
            }
        }
    }

    static async myBooking({ userId } : OwnerVehicleModel.MyBookingSchema) : Promise<OwnerVehicleModel.MyBookingSuccess | OwnerVehicleModel.MyBookingFailed>{
        try{
            const res = await prisma.user.findMany({
                where :  {
                    id : userId, 
                
                },
                select : {
                    vehicles : true,
                }
            })
            if(!res){
                return  {
                    success : "failed",
                    msg : "you don't have any booking yet!"
                }
            }
            return {
                success : "success",
                vehicles : res
            }
        }catch(e){
            return {
                success : "failed",
                msg : "something went wrong!",
                error : e
            }
        }
    }

    static async acceptBooking({ bookingId, ownerId }: { bookingId: string, ownerId: string }): Promise<OwnerVehicleModel.AcceptBookingSuccess | OwnerVehicleModel.AcceptBookingFailed> {
            try {
                const result = await prisma.$transaction(async (transaction) => {
                    const updated = await transaction.booking.updateMany({
                        where: {
                            id: bookingId,
                            status: "PENDING",
                            vehicle: { ownerId }
                        },
                        data: { status: "APPROVED" }
                    })
    
                    if (updated.count === 0) {
                        return null
                    }
    
                    const booking = await transaction.booking.findUniqueOrThrow({
                        where: { id: bookingId },
                        select: { renterId: true }
                    })
    
                    await transaction.notification.create({
                        data: {
                            userId: booking.renterId,
                            bookingId,
                            type: "BOOKING_ACCEPTED"
                        }
                    })
    
                    return booking
                })
    
                if (!result) {
                    return {
                        success: "failed",
                        msg: "booking was not found, already accepted, or you do not own the vehicle"
                    }
                }
    
                return {
                    success: "success",
                    data: { bookingId, status: "ACCEPTED" }
                }
            } catch (e) {
                return {
                    success: "failed",
                    msg: "something went wrong!",
                    error: e
                }
            }
        }
    
}