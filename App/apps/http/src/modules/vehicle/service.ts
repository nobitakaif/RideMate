import { prisma } from "@repo/db";
import { VehicleModel } from "./model";

export abstract class VehicleService{
    static async addVehilce({ body, ownerId } : {body : VehicleModel.AddVehicleSchema, ownerId : string}) : Promise<VehicleModel.AddVehicleSuccess | VehicleModel.AddVehicleFailed>{

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
                    gpsDevice : {
                        create : {
                            deviceId : body.deviceId!,
                            imei : body.imeiNumber!.toString(),
                            simNumber : body.simNumber!.toString()
                        }
                    },
                    purchasedYear : body.purchaseYear,
                    yearOld : body.yearOld
                }
            })
            
            return {
                success :true,
                msg : "your vehicle is successfully added"
            }
        }catch(e){
            return {
                success : false,
                error : "something went wrong!"
            }
        }
    }
}