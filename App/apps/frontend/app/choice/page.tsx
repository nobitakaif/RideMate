"use client"

import { client } from "@/config/elysiaClient"
import {motion  } from "motion/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const choice = [{
        title : "Rent a vehicle",
        url : "/rent"
    },{
        title : "Be a Renter",
        url : "/renter"
    }]

export default function Page(){

    const router = useRouter()
    
    
    return <div className="h-screen w-full bg-[#1C1C17] flex justify-center items-center">
        <motion.div initial={{opacity : 0}} animate={{ opacity:1 }} transition={{duration : 0.5}} className="bg-[#F0EEE8] h-55 w-127 flex justify-center items-center flex-col gap-4 rounded-lg">
            { choice.map((opt, idx) =>(
                    <motion.button key={idx} className="bg-[#2D6A4F] hover:bg-[#1F4F3A] cursor-pointer w-44 p-2  rounded-lg text-xl text-[#F0EEE8]" onClick={() => {
                        router.push(opt.url)
                    }}>
                    {opt.title}
                </motion.button>
                ))
            }
        </motion.div>
        
    </div>
}