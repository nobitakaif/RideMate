"use client"
import { motion } from "motion/react"
export default function AnimatedLogo(){
    return <div className="w-full h-full flex flex-col lg:gap-15">
                {/* Logo */}
        
                <div>
                    <motion.h1 
                    initial ={{
                        opacity : 0,
                        x : 400,
                    }}
                    animate = {{
                        opacity : 1, 
                        x: 0
                    }}
                    transition={{
                        duration : 0.5,
                        delay : 0.5
                    }}
                    className="text-[#F0EEE8] text-4xl font-semibold">Ride<span className="text-[#2D6A4F]">Mate</span>
                    </motion.h1>
                </div>
                {/* Title */}
                <motion.div className="text-6xl font-bold"
                    initial={{
                        opacity : 0,
                    }}
                    animate ={{
                        opacity : 1
                    }}
                    transition={ {
                        delay : 0.5,
                        duration : 0.5
                    }}
                >
                    <h1 className="text-[#F0EEE8]">Rent a Car from </h1>
                    <h1 className="text-[#5DAF82]">people you trust</h1>
                </motion.div>
            </div>
}