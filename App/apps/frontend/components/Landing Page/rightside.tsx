"use client"
import { MapPin } from "lucide-react"
import { motion } from "motion/react"
import NearByCarList from "./nearByCarList"

export interface TopCarList {
    vehicleName: string,
    location: string,
    seater: number,
    rating: number,
    price: number,
    available: boolean,
    vehicle: "Car" | "Bike"
}

const dummyCarList: TopCarList[] = [
    {
        vehicleName: "Tesla Model 3",
        location: "Downtown Garage",
        seater: 5,
        rating: 4.8,
        price: 72,
        available: true,
        vehicle: "Car"
    },
    {
        vehicleName: "Yamaha MT-07",
        location: "City Center",
        seater: 2,
        rating: 4.5,
        price: 35,
        available: false,
        vehicle: "Bike"
    },
    {
        vehicleName: "Honda Civic",
        location: "Northside Parking",
        seater: 5,
        rating: 4.6,
        price: 58,
        available: true,
        vehicle: "Car"
    },
    {
        vehicleName: "Kawasaki Ninja",
        location: "East Lot",
        seater: 2,
        rating: 4.7,
        price: 40,
        available: true,
        vehicle: "Bike"
    }
]


export default function RightSide() {
    return <div className="w-full  h-[90vh] text-center flex justify-center items-center p-2">
        <motion.div className="h-124 w-full gap-4  bg-[#F0EEE8] rounded-xl flex flex-col p-4">
            <motion.div className="flex justify-between ">
                <motion.span className="">Near By Vehicle</motion.span>
                <motion.span className="flex justify-center items-center gap-1"><MapPin /> Bangalore</motion.span>
                {/* car list  */}

            </motion.div>
            
            <motion.div className="lg:h-[85%] flex flex-col gap-2">
                {dummyCarList.map((item, idx) =>(
                    <NearByCarList props={item} key={idx}/>
                ))}
            </motion.div>
        </motion.div>
    </div>
}