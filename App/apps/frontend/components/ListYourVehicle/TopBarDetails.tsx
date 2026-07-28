"use client"

import { Dot } from "lucide-react"
import { motion } from "motion/react"
import PlatformSupport from "./platformSupport"

export default function TopBarDetails(){
    return <div className="mt-10">
        <motion.div className="bg-[#aeddc4] h-8 w-44 rounded-full flex justify-center items-center">
            <motion.span className="text-[#0a562f] flex justify-center items-center">
                <Dot />for owner vehicle
            </motion.span>
        </motion.div>
        <motion.div className="flex flex-col">
            <motion.span className="text-6xl dark:text-[#F0EEE8] text-black">
                List your vehicle
            </motion.span>
            <motion.span className="text-6xl text-[#0a562f]">
            Earn while it sits idle.
            </motion.span>
        </motion.div>
        <motion.p className="mt-4 text-lg text-[#6B6B5E]">
            Fill in a few details about your car. We verify, insure and surface it to nearby renters <br/> you keep the earnings.
        </motion.p>
        <div>
            <PlatformSupport/>
        </div>
    </div>
}