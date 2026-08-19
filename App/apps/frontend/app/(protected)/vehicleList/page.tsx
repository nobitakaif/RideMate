"use client"
import ListYourVehicle from "@/components/ListYourVehicle/listVehicle";
import { Button } from "@/components/ui/button";
import { client } from "@/config/elysiaClient";
import { useState } from "react";

export default function VehicleList(){
    const [data, setData ] = useState()

    async function sendReq (){
        const purchaseYear = new Date()
        purchaseYear.setFullYear(purchaseYear.getFullYear() -10)
        const res = await  client.api.v1.my_vehicle.add.post({
            availableLocation: ['mumbai'],
            brand: "BMW",
            gpsEnabled: false,
            model: "m4-2021",
            pricePerDay: 5000,
            pricePerHour: 1000,
            purchaseYear: purchaseYear.toISOString(),
            registrationNumber: "123321",
            type: "CAR",
            yearOld: 10,
            fuel: "ELECTRIC",
            currentState: "AVAILABLE"
        })
        console.log("res data -> ",res.data)
    }
    return <div className="dark:bg-[#1C1C17] h-screen w-full flex justify-center bg-[#FAFAF7]">
        <ListYourVehicle/>
    </div>
}