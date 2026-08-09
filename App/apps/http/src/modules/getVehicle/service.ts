import { prisma } from "@repo/db";
import { RentalVehicleModel } from "./models";


export abstract class RentalVehicleService{
    static async getVehicleById({ vehicleId } : RentalVehicleModel.GetVehicleById) : Promise<RentalVehicleModel.GetVehicleByIdSuccess | RentalVehicleModel.GetVehicleByIdFailed>{
        try{
            const vehicle = await prisma.vehicle.findFirst({
                where : {
                    id : vehicleId
                }
            })

            if(!vehicle){
                return {
                    msg : "vehicle does not exist",
                    status : "not found"
                }
            }
            return {
                vehicle,
                status : "success"
            }
        }catch(e){
            return {
                status : "error",
                error : e,
                msg : "something went wrong "
            }
        }
    }
    async getVehicleByLocation (){

    }

}