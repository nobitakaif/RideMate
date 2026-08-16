import Elysia, { t } from "elysia";
import { RentalVehicleModel } from "./models";
import { RentalVehicleService } from "./service";


export const RentalVehicle = new Elysia({prefix : "/vehicle"})
    // this route should not be authenticated because without login user can also see the nearest vehicle 
    .get("/:vehicleId", async ({ params, status  }) =>{
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
        // body : RentalVehicleModel.getVehicleByLocationFailed,
        response :{
            200 : RentalVehicleModel.getVehicleByIdSuccess,
            400 : RentalVehicleModel.getVehicleByIdFailed
        }
    })
    .get("/:location", async({ body, status })=>{ // user can see nearest vehicle
        const res = await RentalVehicleService.getVehicleByLocation({location : body.location })
        if(res.status == "success"){
            return status(200, {
                status : res.status,
                vehicles : res.vehicles
            })
        }
        return status(400,{
            msg : res.msg, 
            status : res.status,
            error : res.error
        })
    }, {
        params : t.Object({
            location : t.String()
        }),
        body : RentalVehicleModel.getVehicleByLocationSchema,
        response : {
            200 : RentalVehicleModel.getVehicleByLocationResponse,
            400 : RentalVehicleModel.getVehicleByLocationFailed
        }
    })