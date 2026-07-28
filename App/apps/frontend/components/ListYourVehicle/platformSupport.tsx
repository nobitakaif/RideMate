"use client"

import { BadgeDollarSign, ShieldCheck, Sparkles } from "lucide-react"
import { motion } from "motion/react"

interface Feature{
    icon : any,
    text : string,
}

const features : Feature[] = [
    {
        icon : <BadgeDollarSign className="text-[#0a562f] bg-[#c7e2d3] rounded p-1"/>,
        text : "Avg. $300/mo"
    },
    {
        icon : <ShieldCheck className="text-[#0a562f] bg-[#c7e2d3] rounded p-1"/>,
        text : "Avg. $300/mo"
    },
    {
        icon : <Sparkles className="text-[#0a562f] bg-[#c7e2d3] rounded p-1"/>,
        text : "Avg. $300/mo"
    }
]

export default function PlatformSupport(){
    return <div className="flex gap-3">
        {features.map((item, idx) =>(
            <motion.div className="h-14 w-88 border rounded-lg flex items-center px-6 gap-3 p-2 bg-white">
                {item.icon}
                {item.text}
            </motion.div>
        ))}
    </div>
}