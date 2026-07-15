"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "../ui/button"

const options = ["Home", "Browse", "History"]

const choice = ["List you car", "Get a vehicle"]

export default function HeaderOption() {
    const [selectedOption, setSelectedOption] = useState<string>("Home")
    const [choiceSelect, setChoiceSelect] = useState()

    return (
        <div className="flex w-full justify-around items-center ">
            <div className="flex gap-7">
                {options.map((opt) => (
                <div
                    key={opt}
                    className={`text-lg cursor-pointer transition-colors duration-200 h-8 w-20 text-center rounded-lg  ${
                        selectedOption === opt 
                            ? "text-[#F0EEE8] font-semibold" 
                            : "text-[#6B6B5E] hover:bg-[#414134]"
                    }`}
                    onClick={() => setSelectedOption(opt)}
                >
                    {opt}
                </div>
            ))}
            </div>
            <div className="flex gap-5 justify-center items-center item">
                {choice.map((ch) =>(
                <motion.div className={`border cursor-pointer border-[#414134] rounded-lg text-[#F0EEE8] w-33 text-center h-8 text-lg ${ch == "Get a vehicle" ? "bg-[#2D6A4F] " : ""}`}
                    whileHover={{
                        y : -2
                    }}
                    transition={{
                        duration : 0.2
                    }}
                >
                    {ch}
                </motion.div>))}
            </div>
        </div>
    )
}