"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Separator } from "./ui/separator";

const steps = [
  { id: "number", label: "Number" },
  { id: "verify", label: "Verify" },
  { id: "profile", label: "Profile" },
] as const;

type Step = (typeof steps)[number]["id"];

export default function AuthProgressBar({
  state,
}: {
  state: Step;
}) {
  const currentIndex = steps.findIndex((step) => step.id === state);

  return (
    <div className="flex items-center w-full justify-center pl-20">
      {steps.map((step, index) => {
        const completed = index < currentIndex;
        const current = index === currentIndex;

        return (
          <div key={step.id} className="flex flex-1 items-start">
            {/* Step */}
            <div className="flex flex-col items-center shrink-0">
              <motion.div
                className={`h-14 w-14 rounded-full flex items-center justify-center
                ${
                  completed
                    ? "bg-green-700 text-white"
                    : current
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {completed ? (
                  <Check size={24} />
                ) : (
                  <span className="text-xl font-semibold">
                    {index + 1}
                  </span>
                )}
              
              </motion.div>
                
              <p
                className={`mt-3 text-lg ${
                  completed || current
                    ? "text-black"
                    : "text-gray-400"
                }`}
              >
                
                {step.label}
              </p>
            </div>

            {/* Connector */}
            {index !== steps.length - 1 && (
              <div className="flex-1 px-4 mt-7">
                <div className="relative h-[3px] rounded-full bg-gray-200 overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{
                      width: completed ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-0 top-0 h-full bg-green-700"
                  />
                  -------------------------------
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}