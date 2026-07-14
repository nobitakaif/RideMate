"use client"
import { motion } from "motion/react"

interface MainLogoType{
    type : "primary" | "secondary"
}

export default function MainLogo({type} : MainLogoType){
    return <div className="w-full">
        <motion.h1 className="text-[#F0EEE8] text-4xl font-semibold" initial={{
        opacity : 0
    }}
    animate ={{
        opacity : 1,
    }}
    transition={{
        duration : 1
    }}
    >
        Ride<motion.span className="text-[#2D6A4F]">Mate</motion.span>
    </motion.h1>
    </div>
}