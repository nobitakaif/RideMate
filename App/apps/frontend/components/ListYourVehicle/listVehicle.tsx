"use client"
import { motion } from "motion/react"
import TopBarDetails from "./TopBarDetails";

import ViewVehicleCard from "./viewVehicleCard";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { Check, Upload } from "lucide-react";
import Link from "next/link";
import { Label } from "../ui/label";
import { VehicleDetails } from "./vehilceDetails";

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
          <VehicleDetails/>
      </div>
}
