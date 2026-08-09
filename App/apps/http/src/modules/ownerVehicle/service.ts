import { prisma } from "@repo/db";
import { VehicleModel } from "./model";

export abstract class VehicleService{
    static async addVehicle({ body, ownerId } : {body : VehicleModel.AddVehicleSchema, ownerId : string}) : Promise<VehicleModel.AddVehicleSuccess | VehicleModel.AddVehicleFailed>{

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
                }
            })
            
            return {
                success :true,
                msg : "your vehicle is successfully added"
            }
        }catch(e){
            console.log("error -> ",e)
            return {
                success : false,
                error : "something went wrong!"
            }
        }
    }

    static async uploadVehiclePhoto ({ vehicleId, url } : VehicleModel.AddVehiclePhoto) : Promise<VehicleModel.AddVehiclePhotoSuccess | VehicleModel.AddVehiclePhotoFailed> {
        try{
            const res = await prisma.vehicleImages.create({
                data : {
                    vehicleId : vehicleId,
                    imageUrl : url
                }
            })
            return {
                success : true,
                msg : "photo uploaded"
            }
        }catch(e : any){
            return {
                error : e,
                success : false
            }
        }
    }
}