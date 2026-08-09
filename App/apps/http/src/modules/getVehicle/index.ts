import Elysia, { t } from "elysia";
import { RentalVehicleModel } from "./models";
import { RentalVehicleService } from "./service";


export const RentalVehicle = new Elysia({prefix : "/vehicle"})
    // this route not should be autheticated because without login user can also see the nearest vehicle 
    .get("/:vehicleId", async ({ params, body, status  }) =>{
        const { vehicleId } = params 
        const res = await RentalVehicleService.getVehicleById({ vehicleId })
        if(res.status == "success"){
            return status(200, {
                vehicle : res.vehicle,
                status : res.status
            })
        }
        return status(400, {
            msg : res.msg,
            error : res.error,
            status : res.status
        })
    }, {
        params : t.Object({
            vehicleId : t.String()
        }), 
        body : RentalVehicleModel.getVehicleByLocationFailed,
        response :{
            200 : RentalVehicleModel.getVehicleByIdSuccess,
            400 : RentalVehicleModel.getVehicleByIdFailed
        }
    })