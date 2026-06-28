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
    const [selected, setSelected] = useState< 'phone'|'google' >('phone')
    const phoneRef = useRef<HTMLDivElement | null>(null)
    const googleRef = useRef<HTMLDivElement | null>(null)

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

    const getClassName = (option : any) => {
        const isSelected = selected === option;
        const baseClasses = "w-full text-center p-1 text-2xl rounded-2xl cursor-pointer";
        
        if (isSelected) {
        // Selected State: Black background, white text (or black text as requested)
        return `${baseClasses} bg-black text-white`; 
        } else {
        // Unselected State: Gray background, dark gray text
        return `${baseClasses} `;
        }
    };
    const handleSelect = (option : any) => {
        setSelected(option);
    };
    
    return (
        <div className="bg-[radial-gradient(at_50%_0%,_rgb(229,231,235),_rgb(156,163,175),_rgb(75,85,99))] h-screen w-full flex justify-center items-center ">
            <div className="h-[90%] w-[90%] bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex justify-center items-center h-[90%]">
                    <Card className="w-full max-w-md sm:w-[40%] h-100 max-h-[80vh] ">
                        <CardTitle className="text-center text-4xl font-roboto-700 font-bold">
                            Please Authorize yourself
                        </CardTitle>
                        <CardContent className="h-[80%] w-full p-5 ">
                            <div className="flex justify-around rounded-2xl h-10 bg-gray-200 text-gray-600 ">
                                <div className={getClassName('phone')} onClick={() => handleSelect('phone')}>
                                    Phone Number
                                </div>
                                <div className={getClassName('google')} onClick={() => handleSelect('google')}>
                                    Google
                                </div>
                            </div>
                            <div className="h-full  flex justify-center items-center">
                                { selected === 'phone' ? 
                                    <div >
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
                     
                     <Button className="w-full bg-blue-500 mt-4 mb-4 cursor-pointer text-xl font-bold" onClick={sendOTPHandler}>{isLoading ? <Spinner /> : "Send OTP"}</Button>
                                        
                                    </div>
                                : 
                                    <div className="">
                                        <ConnectWithGoogle/>  
                                    </div>
                                }
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
            </div>

        </div>        
    )
}

// //  <Card className="w-[30%]  text-black p-3">
// //                 <CardTitle className="text-black  text-center text-4xl font-bold ">Authorize yourself</CardTitle>
// //                 <CardContent >
// //                     <Label className="text-2xl">Phone Number : </Label>
// //                     <Input type="text" placeholder="enter your phone number " className="tracking-[0.5em] text-2xl p-2 border-2 border-black" 
// //                      maxLength={10} pattern="[0-9]{10}" ref={inputRef} onChange={(e) => {
// //                         const value = e.target.value
// //                         const numericValue = value.replace(/\D/g, "")
// //                         if (numericValue !== value) {
// //                             setError("enter number")
// //                             e.target.value = numericValue
// //                         } else {
// //                             setError(null)
// //                         }
// //                     }} />
// //                     
// //                     <Button className="w-full bg-blue-500 mt-4 mb-4 cursor-pointer text-xl font-bold" onClick={sendOTPHandler}>{isLoading ? <Spinner /> : "Send OTP"}</Button>

// //                 </CardContent>
                
// //             </Card>
// //             
// // }

// export default function Page(){
//     return <PlaceholdersAndVanishInput onChange={( )=>{}} onSubmit={() =>{}} placeholders={["enter you phone number"]}/>
// }











// <div className="h-screen w-full bg-[radial-gradient(at_50%_0%,_rgb(229,231,235),_rgb(156,163,175),_rgb(75,85,99))] flex justify-center items-center">
//             <div className="h-[90%] w-[90%]  rounded-4xl flex gap-2 shadow-2xl ">
//                 {/* left side */}
//                 <div className=" h-full w-[50%] bg-[#93eded44] rounded-l-4xl">

//                 </div>
//                 {/* right side */}
//                 <div className=" bg-[#dddddd49]  w-[50%] rounded-4xl flex pt-5 flex-col lg:gap-20 p-4 items ">

//                     <div className="flex justify-between">
//                         <h1 className="text-4xl font-roboto-700 ml-5 mt-5 ">RideMate</h1>
//                         <div className="flex gap-2 mt-5 mr-5">
//                             <User />
//                             <h1 className="font-roboto-400">Login</h1>
//                         </div>  
//                     </div>
//                     <div className="flex justify-center items-start  h-full">
//                         <Card className="bg-[#dddddd86] h-[80%] w-[80%] mt-5 shadow-2xl">
//                             <CardTitle className="text-center text-4xl font-bold font-roboto-400">Please Authorize YourSelf</CardTitle>
//                             <div className="p-4">
//                                 <Label className="mb-2 text-lg">Phone Number</Label>
//                                 <Input type="text" placeholder="enter your phone number "
//                                     className="tracking-[0.5em] text-2xl p-2 border-2 border-black rounded-full" 
//                                     maxLength={10} pattern="[0-9]{10}" ref={inputRef} onChange={(e) => {
//                                         const value = e.target.value
//                                         const numericValue = value.replace(/\D/g, "")
//                                         if (numericValue !== value) {
//                                             setError("enter number")
//                                             e.target.value = numericValue
//                                         } else {
//                                             setError(null)
//                                         }
//                                 }} />
//                                 {error && <p className="text-red-700 mt-1"> {error}</p>}
                                
//                             </div>
//                             <Button className="p-4 mx-2 text-lg" onClick={sendOTPHandler}>Send OTP</Button>
//                         </Card>
                        
//                     </div>
//                     <div className="absolute w-[50%] h-full top-0 overflow-hidden">
//                             {!showOTP && <OTPBox setShowOTP={setShowOTP}/>}
//                         </div>
//                 </div>
//             </div>
//         </div>