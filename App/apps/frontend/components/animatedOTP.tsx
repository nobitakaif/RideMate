"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import  AuthProgressBar  from "./AuthProgress";

const steps = [
  { id: "number", label: "Number" },
  { id: "verify", label: "Verify" },
  { id: "profile", label: "Profile" },
] as const;

type Step = (typeof steps)[number]["id"];

export default function AnimatedOTP({state} : {state : 'verify' | 'profile' | 'number'}) {
//   const currentIndex = steps.findIndex((step) => step.id === state);

  return <div>
    <AuthProgressBar state={state}/>
  </div>
  
}