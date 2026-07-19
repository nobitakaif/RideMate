"use client"
import { ArrowRight, BadgeDollarSign, Car, Dot } from "lucide-react"
import { motion } from "motion/react"
import AnimatedText from "./text"

export default function LeftSide(){
    return <div className="w-full h-full flex justify-center items-center ">
        <div className=" lg:h-[70vh] w-full lg:pl-20  flex flex-col gap-4">
            <motion.nav className="h-7 w-56 flex justify-center items-center border border-[#23231c] text-[#2a9565] rounded-2xl bg-[#414134]">
            <Dot /> <motion.span>P2P Vehicle Rental Platform</motion.span>
            </motion.nav>
            <div >
                <motion.h1 className="text-[#F0EEE8] text-6xl">
                    {/* Your community<br/>
                    Your cars.<br/> */}
                    <AnimatedText/>
                    <motion.span>
                        The car you
                        need <br />is parked
                        near <br /> your house.
                    </motion.span>
                </motion.h1>
            </div>
            <div>
                <motion.p className="text-lg text-[#414134]">
                    Book a verified car from someone in your<br/> city. Or list yours and turn idle time into <br /> income. Transparent, insured, and instant
                </motion.p>
            </div>
            <div className="flex flex-col gap-3">
                <motion.button className="flex gap-2 p-4 text-[#F0EEE8] text-xl h-10 bg-[#2e845e] hover:bg-[#265942] cursor-pointer text-center justify-between items-center w-88 rounded-lg">
                    <span className="flex gap-3"><Car />Get a vehicle</span>
                    <ArrowRight className="text-end" />  
                </motion.button>    
                <motion.button className="flex gap-2 p-4 text-[#F0EEE8] text-xl h-10 bg-[#343427] hover:bg-[#414134] cursor-pointer text-center justify-between items-center w-88 rounded-lg">
                    <span className="flex gap-3"><BadgeDollarSign />List your car and earn</span>
                    <ArrowRight className="text-end" />  
                </motion.button>
            </div>    
        </div>
        
    </div>
}