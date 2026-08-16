import { t } from "elysia"

export namespace RentalVehicleModel{

    export const getVehicleById = t.Object({
        vehicleId : t.String()
    })
    export type GetVehicleById = typeof getVehicleById.static

    export const getVehicleByIdSuccess = t.Object({
        vehicle : t.Any(),
        status : t.Literal("success")
    })
    export type GetVehicleByIdSuccess = typeof getVehicleByIdSuccess.static
    
    export const getVehicleByIdFailed = t.Object({
        error : t.Optional(t.Any()),
        msg : t.String(),
        status : t.UnionEnum(["error", "not found"])
    })
    export type GetVehicleByIdFailed = typeof getVehicleByIdFailed.static
    
    export const getVehicleByLocationSchema = t.Object({
        location : t.String()
    })
    export type GetVehicleByLocationSchema = typeof getVehicleByLocationSchema.static

    export const getVehicleByLocationResponse = t.Object({
        status : t.Literal("success"),
        vehicles : t.Array(t.Object({
            vehicleId : t.String(),
            vehicleImage : t.Array(t.String()),
            vehiclePrice : t.Union([t.String(), t.Number()]),
            ownerName : t.Optional(t.String()),
            brand : t.String(), 
            fuelType : t.UnionEnum(['BIKE', 'CAR', 'OTHER']),
            feedback : t.Optional(t.Any()),
        }))
    })
    export type GetVehicleByLocationResponse = typeof getVehicleByLocationResponse.static

    export const getVehicleByLocationFailed = t.Object({
        msg : t.String(),
        status : t.Literal("failed"),
        error : t.Optional(t.Any())
    })
    export type GetVehicleByLocationFailed = typeof getVehicleByLocationFailed.static

    
}