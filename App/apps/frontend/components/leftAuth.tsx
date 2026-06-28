"use client"
import Link from "next/link";
import SigninPage from "./signin";
import { useState } from "react";
import AnimatedOTP from "./animatedOTP";


export default function LeftSigninAuthPage(){
    const [showOTP, setShowOTP] = useState<boolean>(false)
    const [progress, setProgress] = useState<'number' | 'profile' | 'verify'>('number')
    return <div className="h-screen w-full bg-[#F0EEE8] flex justify-center items-center flex-col">
        
        {
            showOTP ?  <AnimatedOTP state={progress}/> : <SigninPage setShowOTP={setShowOTP} setProgress={setProgress}/> 
        }
        <p>By continuing you agree to our <Link href={"#"} className="text-[#2D6A4F] hover:text-[#1F4F3A] underline">Terms</Link> and <Link href={"#"} className="text-[#2D6A4F] hover:text-[#1F4F3A] underline">Privacy policy</Link></p>
    </div>
}