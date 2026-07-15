"use client"
import ConnectWithGoogle from "@/components/connectGoogle";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserInfoStore } from "@/components/zustandProvider";
import { client } from "@/config/elysiaClient";
import { useHydratedPhoneNumber } from "@/hooks/userHydrateStore";
import { BACKEND_URL } from "@/lib/config";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRef, useState } from "react";
import { toast } from "sonner";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export default function UserInfoPage() {
  
  const number = useHydratedPhoneNumber()
  const nameRef = useRef<HTMLInputElement | null>(null)

  async function submitHandler () {
    
    if(!nameRef.current?.value){
      toast.error("please enter your name")
      return 
    }
    const res = await client.api.v1.auth.number.post({name : nameRef.current.value, phoneNumber : number?.toString()!})
    if(!res.data?.success){
      console.log("error -> ",res.data?.error)
      toast.error("something went wrong ")
    }

  } 

  if(!number){
    return <div>
      Loading..
    </div>
  }
  
  
  return (
      <div className="flex justify-center items-center h-screen w-full">
        <Card className="w-[25%] p-4 ">
          <CardTitle className="text-center text-2xl font-bold text-sky-500">User Details</CardTitle>
          <div className="flex gap-2">
            <Label className="text-lg">Number </Label><Input value={number} disabled/>
          </div>
          <div className="p-1">
              <Label className="text-lg">Name</Label>
              <Input placeholder="enter your name" ref={nameRef}/>
          </div>
        <Button onClick={submitHandler}>Submit</Button>
        </Card>
      </div>  
    
  );
}
