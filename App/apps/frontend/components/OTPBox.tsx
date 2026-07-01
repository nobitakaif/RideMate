import { IoArrowBackOutline } from "react-icons/io5";
import { motion } from "motion/react"
import OTP from "./otp";
import { useState } from "react";
import OTPInput from "./inputOTPBox";

export default function OTPBox({number, setSteps} : { number : string, setSteps : any }){
    const [showOTP, setShowOTP] = useState(false)
    return <div className="flex flex-col gap-4">
        <motion.div className="text-[#AAAAAA] flex gap-2 items-center text-lg hover:bg-gray-300 cursor-pointer hover:text-gray-500 w-38 rounded-lg " onClick={() =>setSteps("number")}>
            <IoArrowBackOutline className="h-6 w-6 text-center"/>
            <p>Change number</p>
        </motion.div>
        {/* box */}
        <h1 className="text-2xl">
            Enter verification code
        </h1 >
        <p className="text-[#AAAAAA]">We sent a 6-degit co to 
            <span className="text-black font-semibold font-roboto-400">
                { number }
            </span>
        </p>
        <div>
            <p>One-time password</p>
            <OTPInput setSteps={setSteps}/>
        </div>
    </div>
}