"use client"
import ConnectWithGoogle from "@/components/connectGoogle"
import OTPBox from "@/components/otp"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { usePhoneNumberStore } from "@/components/zustandProvider"
import { client } from "@/config/elysiaClient"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { toast } from "sonner"



export default function LoginPage() {

    const setPhoneNumber = usePhoneNumberStore((state) => state.setPhoneNumber)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showOTP, setShowOTP] = useState(false)
    const router = useRouter()

    const sendOTPHandler = async () => {

        if (!inputRef.current?.value) {
            setError("please enter number")
            return
        }
        if (inputRef.current.value.length < 10 || inputRef.current.value.length > 10 ) {
            setError("please enter valid number")
            return
        }
        setIsLoading(true)
        
        setPhoneNumber(inputRef.current.value)
        toast.message(inputRef.current.value)
        // toast.message(phoneNumber)
        // router.push("/info")
        // return 
        const {error, data} = await client.api.v1.auth.number.sent.post({ number : `+91${inputRef.current.value}`})
        console.log(data)
        if(error){
            setError(error.value.message ?? "something went wrong")
            setIsLoading(false)
            return
        }
        toast.success("OTP has been sent to your number")
        setIsLoading(false)
        
        setShowOTP(true)
        
    }

    return (
        <div className="h-screen w-full bg-[#e2dfdf] flex justify-center items-center">
            <Card className="w-[30%]  text-black p-3">
                <CardTitle className="text-black  text-center text-4xl font-bold ">Authorize yourself</CardTitle>
                <CardContent >
                    <Label className="text-2xl">Phone Number : </Label>
                    <Input type="text" placeholder="enter your phone number " className="tracking-[0.5em] text-2xl p-2 border-2 border-black" 
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
                    {error && <p className="text-red-700 mt-1"> {error}</p>}
                    <Button className="w-full bg-blue-500 mt-4 mb-4 cursor-pointer text-xl font-bold" onClick={sendOTPHandler}>{isLoading ? <Spinner /> : "Send OTP"}</Button>

                </CardContent>
                
            </Card>
            {showOTP && <OTPBox setShowOTP={setShowOTP}/>}
        </div>
    )
}