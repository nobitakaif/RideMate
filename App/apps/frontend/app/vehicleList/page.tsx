"use client"
import { Button } from "@/components/ui/button";
import { client } from "@/config/elysiaClient";
import { useState } from "react";

export default function VehicleList(){
    const [data, setData ] = useState()

    async function sendReq (){
        const purchaseYear = new Date()
        purchaseYear.setFullYear(purchaseYear.getFullYear() -10)
        const res = await  client.api.v1.vehicle.add.post({
            availableLocation : ['mumbai'],
            brand : "BMW",
            gpsEnabled : false,
            model : "m4-2021",
            pricePerDay : 5000,
            pricePerHour : 1000,
            purchaseYear : purchaseYear.toISOString(),
            registrationNumber : "123321",
            type : "CAR",
            yearOld : 10,
        })
        console.log("res data -> ",res.data)
    }
    return <div className="h-screen w-full">
        <Button onClick={sendReq}>send req</Button>
    </div>
}