import { vehicleStore  } from "@/config/vehicle/vehicleStore"
import { useStore } from "zustand"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import VehicleDetailForm from "./vehicleDetailForm"

export function VehicleDetails(){
    const vehicle = useStore(vehicleStore, (state) =>state.vehicle)
    const setVehicle = useStore(vehicleStore, (state) =>state.setVehicle)
    return <div className="mt-5 rounded-lg w-full  flex gap-3">
        {/* left form */}
        <div className="rounded-lg w-3/4 ">
            <VehicleDetailForm/>
        </div>
        {/* right preview of vehicle */}
        <div className="bg-red-500 rounded-lg w-2/4 h-100">

        </div>
    </div>
}