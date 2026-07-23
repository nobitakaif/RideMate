"use client"

import { motion } from "motion/react"

interface Step {
    icon : any,
    steps : number,
    title : string, 
    paragraph : string
}

const steps : Step[] = [
    {
        icon : "",
        steps : 1,
        title : "Search near you",
        paragraph : "Browse verified cars from local owners in your neighborhood."
    },
    {
        icon : "",
        steps : 2,
        title : "Book and pay",
        paragraph : "Pick your dates, pay securely, and receive instant confirmation."
    },
    {
        icon : "",
        steps : 3,
        title : "Pick up and drive",
        paragraph : "Meet the owner, grab the keys, and hit the road on your schedule."
    }
]
export default function Guides(){
    return <motion.div className="h-160 w-full flex flex-col justify-center items-center">
        <motion.div>
            <motion.h1 className="text-6xl font-bold text-center "> Ready in 3 steps </motion.h1>
            <motion.p className="text-lg mt-5 text-[#6c6c57]">From search to steering wheel, the whole journey is designed to feel effortless.</motion.p>
        </motion.div>
        <motion.div>

        </motion.div>
    </motion.div>
}