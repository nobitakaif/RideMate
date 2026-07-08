"use client"
import ConnectWithGoogle from "@/components/connectGoogle"
import { Card, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserInfoStore } from "@/components/zustandProvider"
import { client } from "@/config/elysiaClient"
import { createNameStore } from "@/config/nameStore"
import { motion } from "motion/react"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { toast } from "sonner"
export default function Page(){
    const [isProfile, setIsProfile] = useState<"profile" | "google">("profile")
    
    const setName = useUserInfoStore((state) => state.setName)
    const getName  = useUserInfoStore((state) => state.getName)
    const getPhoneNumber  = useUserInfoStore((state) => state.getPhoneNumber)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [nameError, setNameError] = useState<string | null>(null)
    const handleProfile = async (e :React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        if(inputRef.current?.value.length! < 4){
            setNameError("character should be more 4 words")
            return 
        }
        setName(inputRef.current?.value!)
        console.log("user Name -> ", getName())
        console.log("user number -> ", getPhoneNumber())
        const number = getPhoneNumber()
        const name = getName()
        const res = await client.api.v1.auth.number.post({name, phoneNumber : number.toString()})
        if(res.data?.success){
            toast.success("your name is successfully updated")
            setIsProfile("google")
            return 
        }

        toast.error("something went wrong ")
        
    }
    
    return <div className="h-screen w-full bg-[#1C1C17] flex justify-center items-center">
        <motion.div className=" w-100 rounded-lg shadow-2xl shadow-[#356a4d] bg-[#F0EEE8] p-2 flex flex-col gap-4">
            {/* Title */}
            <motion.h1 className="text-center text-3xl font-bold " 
                initial={{
                    opacity : 0,
                }}
                animate ={{
                    opacity : 1
                }}
                transition={{
                    duration : 0.5,
                    
                }}
            >
                Create your <span className="text-[#2D6A4F]">profile</span>
            </motion.h1>
            { isProfile === "profile" ? <>
            
            <motion.div>
                <Label className="text-xl font-semibold">Name</Label>
                <Input placeholder="enter your name" className="border-2 border-gray-500 h-12 text-xl" ref={inputRef} onChange={() =>{
                    setNameError(null)
                }}/>
                {nameError && <motion.p className="text-red-400">{nameError}</motion.p>}
            </motion.div>
            <motion.button className="bg-[#2D6A4F] hover:bg-[#1F4F3A] cursor-pointer w-full p-2 rounded-lg text-xl text-[#F0EEE8]"
                onClick={handleProfile}
            >
                Next
            </motion.button>
            </>

            :
                <ConnectWithGoogle/>
            
            }
        </motion.div>
    </div>
}