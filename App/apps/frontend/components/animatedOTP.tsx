"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import  AuthProgressBar  from "./AuthProgress";
import OTPBox from "./OTPBox";

const steps = [
  { id: "number", label: "Number" },
  { id: "verify", label: "Verify" },
  { id: "profile", label: "Profile" },
] as const;

type Step = (typeof steps)[number]["id"];

export default function AnimatedOTP({state, setSteps} : {state : 'verify' | 'profile' | 'number', setSteps : any}) {
//   const currentIndex = steps.findIndex((step) => step.id === state);

  return <div className="p-1">
    {/* progress bar */}
    <div className="">
      <AuthProgressBar state={"verify"}/>
    </div>
    {/* otp box */}
    <div>
      <OTPBox number={`+91-123456789`} setSteps={setSteps}/>
    </div>
  </div>
}