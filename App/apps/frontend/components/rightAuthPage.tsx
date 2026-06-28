import { GoShieldCheck } from "react-icons/go";
import { TbUsers } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import AnimatedLogo from "./animatedLogo";

export default function RightAuthPage(){
    return <div className="h-screen w-full flex justify-center items-center bg-[#1C1C17]">

        <div className=" h-180 w-[700] flex flex-col ">
            
            <AnimatedLogo/>
            <div className="h-full w-full flex flex-col justify-end py-5 gap-3">
                {/* protection */}
                <div className="flex gap-5">
                    <div className="bg-[#6B6B5E]/20 h-10 w-10 rounded-md flex justify-center items-center">
                        <GoShieldCheck className="text-green-400 h-6 w-8" />    
                    </div>
                    <div >
                        <h1 className="text-[#F0EEE8]">Fully insured trips</h1>
                        <p className="text-[#6B6B5E]">Every booking covered end-to-end</p>
                    </div>
                </div>
                {/* User */}
                <div className="flex gap-5">
                    <div className="bg-[#6B6B5E]/20 h-10 w-10 rounded-md flex justify-center items-center">
                        <TbUsers className="text-green-400 h-6 w-8"/>
                    </div>
                    <div >
                        <h1 className="text-[#F0EEE8]">24,000+ verified users</h1>
                        <p className="text-[#6B6B5E]">KYC checked owners and renters</p>
                    </div>
                </div>
                {/* Location */}
                <div className="flex gap-5" >
                    <div className="bg-[#6B6B5E]/20 h-10 w-10 rounded-md flex justify-center items-center">
                        <CiLocationOn className="text-green-400 h-6 w-8"/>
                    </div>
                    <div >
                        <h1  className="text-[#F0EEE8]">40+ cities</h1>
                        <p className="text-[#6B6B5E]">Available across India</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}