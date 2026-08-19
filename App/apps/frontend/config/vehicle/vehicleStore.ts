import { createStore } from "zustand/vanilla"

export type VehicleInfo = {
    type: "BIKE" | "CAR" | "OTHER"
    brand: string
    model: string
    purchaseYear: string | Date
    registrationNumber: string
    yearOld: number
    pricePerHour: number
    pricePerDay: number
    gpsEnabled: boolean
    simNumber?: number
    imeiNumber?: number
    deviceId?: string
    provider?: number
    images?: string[]
    description?: string
    availableLocation: string[]
    fuel: "ELECTRIC" | "GAS" | "FUEL"
    currentState: "AVAILABLE" | "BOOKED"
}

export type VehicleStore = {
    vehicle: VehicleInfo
    setVehicle: (vehicle: Partial<VehicleInfo>) => void
    resetVehicle: () => void
}

const initialVehicle: VehicleInfo = {
    type: "CAR",
    brand: "",
    model: "",
    purchaseYear: "",
    registrationNumber: "",
    yearOld: 0,
    pricePerHour: 0,
    pricePerDay: 0,
    gpsEnabled: false,
    availableLocation: [],
    fuel: "GAS",
    currentState: "AVAILABLE",
}

export const vehicleStore = createStore<VehicleStore>((set) => ({
    vehicle: initialVehicle,

    setVehicle: (vehicle) =>
        set((state) => ({
            vehicle: {
                ...state.vehicle,
                ...vehicle,
            },
        })),

    resetVehicle: () =>
        set({
            vehicle: initialVehicle,
        }),
}))