import { useRef, useState, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const OTP_LENGTH = 6;

export default function OTPBox({ setShowOTP } : { setShowOTP :any}) {
    const [otp, setOtp] = useState<string[]>(Array.from({ length: OTP_LENGTH }, () => ""));
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const focusInput = (index: number) => {
        const input = inputRefs.current[index];
        if (input) {
            input.focus();
        }
    };

    const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!/^\d*$/.test(value)) {
            return;
        }

        setOtp((currentOtp) => {
            const nextOtp = [...currentOtp];
            nextOtp[index] = value.slice(-1);
            return nextOtp;
        });

        if (value.length > 0) {
            const nextIndex = index + 1;
            if (nextIndex < OTP_LENGTH) {
                focusInput(nextIndex);
            }
        }
    };

    const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && otp[index] === "") {
            const previousIndex = index - 1;
            if (previousIndex >= 0) {
                focusInput(previousIndex);
                setOtp((currentOtp) => {
                    const nextOtp = [...currentOtp];
                    nextOtp[previousIndex] = "";
                    return nextOtp;
                });
            }
        } else if (event.key === "ArrowLeft") {
            const previousIndex = index - 1;
            if (previousIndex >= 0) {
                focusInput(previousIndex);
            }
        } else if (event.key === "ArrowRight") {
            const nextIndex = index + 1;
            if (nextIndex < OTP_LENGTH) {
                focusInput(nextIndex);
            }
        }
    };

    const handlePaste = (index: number) => (event: ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData("text").replace(/\D/g, "");
        if (!pastedText) {
            return;
        }

        setOtp((currentOtp) => {
            const nextOtp = [...currentOtp];
            pastedText.slice(0, OTP_LENGTH - index).split("").forEach((digit, offset) => {
                nextOtp[index + offset] = digit;
            });
            return nextOtp;
        });

        const nextIndex = Math.min(index + pastedText.length, OTP_LENGTH - 1);
        focusInput(nextIndex);
    };

    return (
        <div className="h-screen w-full flex justify-center items-center absolute backdrop-blur-sm" onClick={() => setShowOTP(false)}>
            <Card className="w-77 h-44 p-4">
                <CardTitle className="text-center text-2xl">verify OTP</CardTitle>
                <CardContent className="flex gap-3 justify-center">
                    {otp.map((value, index) => (
                        <Input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={value}
                            ref={(element) => {
                                inputRefs.current[index] = element;
                            }}
                            onChange={handleChange(index)}
                            onKeyDown={handleKeyDown(index)}
                            onPaste={handlePaste(index)}
                            className="h-10 w-12 text-center"
                        />
                    ))}
                </CardContent>
                <Button className="bg-blue-500 text-xl font-semibold">Verify</Button>
            </Card>
        </div>
    );
}