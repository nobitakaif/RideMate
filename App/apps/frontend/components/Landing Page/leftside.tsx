"use client"
import { Dot } from "lucide-react"
import { motion } from "motion/react"

export default function LeftSide(){
    return <div className="w-full h-full flex justify-center items-center ">
        <div className=" lg:h-[70vh] w-full p-10 flex flex-col gap-4">
            <motion.nav className="h-7 w-56 flex justify-center items-center border border-[#23231c] text-[#2a9565] rounded-2xl bg-[#414134]">
            <Dot /> <motion.span>P2P Vehicle Rental Platform</motion.span>
            </motion.nav>
        <div >
            <motion.h1 className="text-white text-6xl">
                Your community<br/>
                Your cars.<br/>
                <motion.span className="text-[#2D6A4F]">Your Platform</motion.span>
            </motion.h1>
        </div>
        <div>
            <motion.p className="text-lg text-[#414134]">
                Book a verified car from someone in your<br/> city. Or list yours and turn idle time into <br /> income. Transparent, insured, and instant
            </motion.p>
        </div>
        </div>
        
    </div>
}