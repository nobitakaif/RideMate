"use client"
import Link from "next/link";
import SigninPage from "./signin";
import { useState } from "react";
import AnimatedOTP from "./animatedOTP";
import AuthProgressBar from "./AuthProgress";
import { motion } from "motion/react"
import { CiCircleCheck } from "react-icons/ci";
import { Button } from "./ui/button";


export default function LeftSigninAuthPage(){
    
    const [progress, setProgress] = useState<'number' | 'profile' | 'verify'>('number')
    const [steps , setSteps] = useState<"number" | "otp" | "profile">("number")
    return <div className="h-screen w-full bg-[#F0EEE8] flex justify-center items-center flex-col">
        
        {
            steps === "number" &&  <SigninPage setSteps={setSteps} setProgress={setProgress}/>
        }
        {
            steps === "otp" && <AnimatedOTP state="verify" setSteps={setSteps} />
        }
        {
            steps === "profile" && <div className="flex flex-col items-center gap-4 ">
                <AuthProgressBar state="profile"/>
                <div className=""><motion.div
                className="h-16 w-16 rounded-full bg-green-200 flex items-center justify-center "
                animate={{
                    scale: [1, 0.5, 1],
                }}
                transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                >
                <CiCircleCheck className="h-8 w-8 text-green-700" />
                </motion.div>
                </div>
                <div>
                    <h1 className="text-2xl text-center font-semibold">Number verified</h1>
                    <p className="text-[#AAAAAA]/90">+91-123456789 is confirmed</p>
                    <p className="text-[#AAAAA5]/90">Let's set up your profile`</p>
                </div>
                <div>
                    <Button className="bg-[#2D6A4F] px-8 text-lg py-4 ">Continue to profile</Button>
                </div>
            </div>
        }
        <p className="mt-10">By continuing you agree to our <Link href={"#"} className="text-[#2D6A4F] hover:text-[#1F4F3A] underline">Terms</Link> and <Link href={"#"} className="text-[#2D6A4F] hover:text-[#1F4F3A] underline">Privacy policy</Link>
        </p>
    </div>
}