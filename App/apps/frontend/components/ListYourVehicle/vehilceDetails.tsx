import { vehicleStore  } from "@/config/vehicle/vehicleStore"
import { useStore } from "zustand"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export function VehicleDetails(){
    const vehicle = useStore(vehicleStore, (state) =>state.vehicle)
    const setVehicle = useStore(vehicleStore, (state) =>state.setVehicle)
    return <div className="mt-5 bg-yellow-300 rounded-lg w-full h-50 flex">
        {/* left form */}
        <div className="bg-green-500 rounded-lg w-3/4 h-100">
            <div>
                
            </div>
        </div>
        {/* right preview of vehicle */}
        <div className="bg-red-500 rounded-lg w-2/4 h-100">

        </div>
    </div>
}