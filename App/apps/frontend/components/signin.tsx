"use client"
import { motion } from "motion/react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { CiMobile3 } from "react-icons/ci";
import { Button } from "./ui/button";
import Link from "next/link";
import { client } from "@/config/elysiaClient";
import { toast } from "sonner";
import { useRef, useState } from "react";

export default function SigninPage({setSteps, setProgress} : {setSteps : any, setProgress : any}){
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [error, setError] = useState<string | null>(null)
    return <motion.div 
        initial ={{
            opacity : 0,
            x : 40,
        }}
        animate = {{
            opacity : 1,
            x : 0
        }}
        transition={{
            duration : 0.5,
            delay : 0.1
        }}
        className=" h-100 w-100 flex flex-col gap-10">
            <div>
                <motion.h1 className="text-4xl font-semibold text-[#1C1C17] ">
                    Create your account
                </motion.h1>
                <motion.p className="text-[#AAAAAA] text-lg">
                    Enter your mobile number to get started
                </motion.p>
            </div>
            <div className="flex flex-col gap-5">
                <Label className="text-lg text-[#1C1C17]">Mobile number</Label>
                <div className="flex w-100 h-10 gap-1 ">
                    <div className="w-2/9 bg-[#AAAAAA] flex  gap-1 justify-center items-center rounded-lg">
                        <CiMobile3 className="h-8 w-5 font-semibold"/>
                        <span className="font-semibold text-lg">+91</span>
                    </div>
                    <Input placeholder="enter your number" className="border-2 border-black h-10 pl-5 text-lg gap-2 font-semibold tracking-[0.9em] placeholder:tracking-normal" maxLength={10} pattern="[0-9]{10}" ref={inputRef}
                    onChange={(e) => {
                        const value = e.target.value
                        const numericValue = value.replace(/\D/g, "")
                        if (numericValue !== value) {
                        //  setError("enter number")
                            e.target.value = numericValue
                        } else {
                        //  setError(null)
                        }
                    }} />
                    {/* {error && <p>{error}</p>} */}
                </div>

                <Button className="bg-[#2D6A4F] hover:bg-[#1F4F3A] cursor-pointer w-full py-5 text-lg " onClick={async (e) =>{
                    e.preventDefault()
                    if(!inputRef.current?.value){
                        toast.error("something went wrong with inputRef number")
                        return 
                    }
                    if (inputRef.current.value.length < 10 || inputRef.current.value.length > 10 ) {
                        toast.error("please enter valid number")
                        return
                    }
                    // toast.success(`all good${inputRef.current.value} `)
                    
                    const res = await client.api.v1.auth.number.sent.post({number : `+91${inputRef.current.value}`})
                    console.log(res.data.msg)
                    toast.success(res.data.msg)
                    setSteps('otp')
                    setProgress('verify')
                   }}>Send OTP</Button>
            </div>
            <p className="text-center">Already have an <Link href={"#"} className="text-[#1F4F3A] underline">Account</Link></p>
    </motion.div>
}