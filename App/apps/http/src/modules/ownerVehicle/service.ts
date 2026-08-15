import { prisma } from "@repo/db";
import { VehicleModel } from "./model";

export abstract class VehicleService{
    static async addVehicle({ body, ownerId,  } : {body : VehicleModel.AddVehicleSchema, ownerId : string}) : Promise<VehicleModel.AddVehicleSuccess | VehicleModel.AddVehicleFailed>{

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

    static async uploadVehiclePhoto ({ vehicleId, url } : VehicleModel.AddVehiclePhoto) : Promise<VehicleModel.AddVehiclePhotoSuccess | VehicleModel.AddVehiclePhotoFailed> {
        try{
            const res = await prisma.vehicleImages.create({
                data : {
                    vehicleId : vehicleId,
                    imageUrl : url
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

    static async getAllOwnerVehicle(){
        
    }
}