"use client"
import { Card } from "@/components/ui/card";
import { usePhoneNumberStore } from "@/components/zustandProvider";
import { BACKEND_URL } from "@/lib/config";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
// console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
export default function ConnectWithGoogle() {
  
    const number = usePhoneNumberStore(state => state.getPhoneNumber())
    const setEmail = usePhoneNumberStore(state => state.setEmail)

    return (
        <GoogleOAuthProvider clientId={googleClientId!}>
            <div className="flex justify-center items-center h-screen w-full">
                <div className="h-44 w-54 ">
                    <GoogleLogin onSuccess={async (cre) =>{

                    // console.log("credential",cre.credential, "number->", number )
                    const res = await fetch(`${BACKEND_URL}/auth/google/callback`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            idToken: cre.credential,
                            number : number
                        }),
                        });
                        const data = await res.json()
                        console.log(data)
                    }} />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}
