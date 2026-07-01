"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const OTP_LENGTH = 6;

export default function OTPInput({setSteps} : {setSteps : any}) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [invalid, setInvalid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;

    const digit = value.slice(-1);

    const copy = [...otp];
    copy[index] = digit;
    setOtp(copy);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    setInvalid(false);
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const copy = [...otp];
        copy[index] = "";
        setOtp(copy);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    const copy = [...otp];

    pasted.split("").forEach((digit, i) => {
      copy[i] = digit;
    });

    setOtp(copy);

    const last = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[last]?.focus();

    setInvalid(false);
  }

  function verifyOTP() {
    if (otp.some((x) => x === "")) {
      setInvalid(true);
      return;
    }

    alert(otp.join(""));
    setSteps("profile")
  }

  return (
    <div className="space-y-5 space-x-40">

      <div className="flex gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={digit}
            maxLength={1}
            onPaste={handlePaste}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`
            h-16
            w-16
            rounded-xl
            border
            text-center
            text-3xl
            font-semibold
            outline-none
            transition

            ${
              invalid && !digit
                ? "border-red-500 animate-shake"
                : "border-green-700 focus:border-green-700"
            }
          `}
          />
        ))}
      </div>
    <div className="flex justify-between">
        <p>
        Code expires in{" "}
        <span className="font-semibold">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
        </span>
        </p>
        <p>
            resend code
        </p>
    </div>
      <Button
        onClick={verifyOTP}
        className="rounded bg-green-700 px-6 py-3 lg:w-md h-10 text-lg cursor-pointer text-white w-full"
        
      >
        Verify number
      </Button>
    </div>
  );
}