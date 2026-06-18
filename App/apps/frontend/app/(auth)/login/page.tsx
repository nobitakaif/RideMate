"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { usePhoneNumberStore } from "@/config/zustandProvider"
import { useRef, useState } from "react"

export default function LoginPage() {

    const { getPhoneNumber, setPhoneNumber, phoneNumber } = usePhoneNumberStore((state) => state)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const sendOTPHandler = () => {

        if (!inputRef.current?.value) {
            setError("please enter number")
            return
        }
        if (inputRef.current.value.length < 10 && inputRef.current.value.length > 10 ) {
            setError("please enter valid number")
            return
        }
        setIsLoading(true)



    }

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <Card className="w-[30%] bg-[#e2dfdf] text-black p-3">
                <CardTitle className="text-black  text-center text-4xl font-bold ">Authorize yourself</CardTitle>
                <CardContent >
                    <Label className="text-2xl">Phone Number : </Label>
                    <Input type="text" placeholder="enter your phone number " className="tracking-[0.5em] text-2xl p-2" 
                     maxLength={10} pattern="[0-9]{10}" ref={inputRef} onChange={(e) => {
                        const value = e.target.value
                        const numericValue = value.replace(/\D/g, "")
                        if (numericValue !== value) {
                            setError("enter number")
                            e.target.value = numericValue
                        } else {
                            setError(null)
                        }
                    }} />
                    {error && <p className="text-red-700"> {error}</p>}
                    <Button className="w-full bg-blue-500 mt-4 cursor-pointer" onClick={sendOTPHandler}>{isLoading ? <Spinner /> : "Send OTP"}</Button>

                </CardContent>
            </Card>

        </div>
    )
}