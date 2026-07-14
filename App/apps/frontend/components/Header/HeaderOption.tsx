"use client"

import { useState } from "react"
import { Button } from "../ui/button"

const options = ["Home", "Browse", "History"]

const choice = ["List you car", "Get a vehicle"]

export default function HeaderOption() {
    const [selectedOption, setSelectedOption] = useState<string>("Home")
    const [choiceSelect, setChoiceSelect] = useState()

    return (
        <div className="flex gap-4 w-full ">
            <div className="flex gap-4 w-full ">
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
            <div className="flex gap-3 justify-center items-center item">
                {choice.map((ch) =>(
                <div className={`border rounded-lg text-[#F0EEE8] w-33 text-center h-8`}>
                    {ch}
                </div>))}
            </div>
        </div>
    )
}