import { prisma } from "@repo/db";
import { RentalVehicleModel } from "./models";


export abstract class RentalVehicleService {
    static async getVehicleById({ vehicleId }: RentalVehicleModel.GetVehicleById): Promise<RentalVehicleModel.GetVehicleByIdSuccess | RentalVehicleModel.GetVehicleByIdFailed> {
        try {
            const vehicle = await prisma.vehicle.findFirst({
                where: {
                    id: vehicleId
                }
            })

            if (!vehicle) {
                return {
                    msg: "vehicle does not exist",
                    status: "not found"
                }
            }
            return {
                vehicle,
                status: "success"
            }
        } catch (e) {
            return {
                status: "error",
                error: e,
                msg: "something went wrong "
            }
        }
    }
    static async getVehicleByLocation({ location }: RentalVehicleModel.GetVehicleByLocationSchema): Promise<RentalVehicleModel.GetVehicleByLocationResponse | RentalVehicleModel.GetVehicleByLocationFailed> {
        try {
            const res = await prisma.vehicle.findMany({
                where: {
                    availableLocation: {
                        has: location
                    }
                },
                select: {
                    feedback: true,
                    brand: true,
                    id: true,
                    owner: {
                        select: {
                            name: true,
                        }
                    },
                    type: true,
                    fuel: true,
                    images: {
                        take : 10,
                        select : {
                            imageUrl : true
                        }
                    },
                    pricePerDay: true,
                }
            })
            if (!res) {
                return {
                    status: "failed",
                    msg: "Something went wrong!"
                }
            }
            return {
                status: "success",
                vehicles: res.map((x) => {
                    return {
                        brand: x.brand,
                        vehicleId: x.id,
                        feedback: x.feedback,
                        fuelType: x.type,
                        vehicleImage: x.images.map(x => { return x.imageUrl }),
                        vehiclePrice: x.pricePerDay || "",
                        ownerName: x.owner.name ?? "User",
                    }
                })
            }
        } catch (e) {
            return {
                status: "failed",
                error: e,
                msg: "Something went wrong here!"
            }
        }
    }

}