"use client"
import { motion } from "motion/react"
import TopBarDetails from "./TopBarDetails";
import VehicleDetails from "./vehicleDetails";
import ViewVehicleCard from "./viewVehicleCard";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { Check, Upload } from "lucide-react";
import Link from "next/link";
import { Label } from "../ui/label";

const CAR_TYPES = ["Hatchback", "Sedan", "SUV", "Luxury", "Electric"] as const;
const FUELS = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"] as const;
const TRANSMISSIONS = ["Manual", "Automatic"] as const;

const fields = [
  { label: "Brand", placeholder: "Enter brand" },
  { label: "Model", placeholder: "Enter model" },
  { label: "Year", placeholder: "Enter year" },
  { label: "Body Type", placeholder: "Enter body type" },
  { label: "Fuel", placeholder: "Enter fuel" },
  { label: "Transmission", placeholder: "Enter transmission" },
  { label: "Seats", placeholder: "Enter seats" },
  { label: "Registration Number", placeholder: "Enter registration number" },
];

export default function ListYourVehicle(){

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
    const [form, setForm] = useState({
        make: "",
        model: "",
        year: "",
        type: "Sedan",
        fuel: "Petrol",
        transmission: "Automatic",
        seats: "5",
        plate: "",
        city: "",
        address: "",
        price: "",
        description: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const update = (k: keyof typeof form, v: string) =>
        setForm((f) => ({ ...f, [k]: v }));

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return <div className=" w-[80vw]  ">
        <TopBarDetails/>
        <div className="bg-yellow-400 mt-2 h-140 w-full flex gap-4">
            {/* left Vehicle info */}
            <div className="h-120 w-full bg-red-400">
                {/* 1st step*/}
                <div className=" flex gap-2">
                    <motion.span className="h-6 text-center text-sm text-green-700 bg-green-100 mt-1 rounded-full w-6 flex justify-center items-center "> 01 </motion.span>
                    <motion.div className="flex items-start h-12 flex-col">
                        
                        <motion.h1 className="text-2xl">Vehicle Details</motion.h1>
                        <motion.span> Tell us what car you're listing.</motion.span>
                    </motion.div>
                </div>
                {/* 1st form */}
                <div className="bg-gray-300 p-5 h-full flex gap-2 w-full mt-5 rounded-lg">
                    <div className="h-full w-full grid grid-cols-2 gap-3">
                        {fields.map((field, index) => (
                          <div key={field.label} className="flex flex-col gap-2">
                            <Label>{field.label}</Label>

                            <Input
                              ref={(el) => {
                                inputRefs.current[index] = el;
                              }}
                              placeholder={field.placeholder}
                              className="h-10"
                            />
                          </div>
                        ))}
                      </div>
                    <div className="bg-green-300 h-90 w-4/7">

                    </div>
                </div>  
          </div>
          </div>
          </div>
}
