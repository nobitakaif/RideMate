"use client"

import { motion } from "motion/react"
import { TopCarList } from "./rightside"
import { Car, Motorbike } from "lucide-react"

export default function NearByCarList({props} : {props : TopCarList}){
    return <motion.div className="bg-[#2b2b23] rounded-lg h-30 w-full flex justify-between px-5 pt-2 items-center cursor-pointer " whileHover={{
        scale : 1.01
    }} transition = {{
        duration : 0.2
    }}>
        {/* icon */}
            <motion.div className="flex   gap-3">
                {props.vehicle == "Bike" ? <Motorbike className="text-[#2a9565] h-12 w-12 bg-[#414134] rounded-lg p-2 mt-3" />  : <Car className=" mt-3 text-[#2a9565] h-12 w-12  bg-[#1C1C17]  rounded-lg p-2"/>}
                <motion.div>
                    <motion.h1 className="text-[#F0EEE8] text-left">{props.vehicleName}</motion.h1>
                    <motion.text className={"text-[#7b7b5f]"}>{props.location} . {props.rating} . {props.seater}</motion.text>
                    <motion.p className="text-lg text-left text-[#545448]"> <motion.span className="text-[#F0EEE8] ">{props.price}</motion.span> / day</motion.p>
                </motion.div>
            </motion.div>
        {/* info */}
        
        {/* available */}
        <motion.div>
        <motion.span className={`bg-[#F0EEE8]  rounded-full  text-center px-2 py-1  text-sm text-[#2e845e]" ${!props.available ? 'text-red-700 border border-red-600 ' : 'text-[#2a9565] border border-[#2a9565]'} `}>
                {props.available ? "Available" : "not available"}
            </motion.span>
        </motion.div>
    </motion.div>
}