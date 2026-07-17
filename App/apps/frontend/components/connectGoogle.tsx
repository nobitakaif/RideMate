"use client"
import { Card } from "@/components/ui/card";
import { useUserInfoStore } from "@/components/zustandProvider";
import { BACKEND_URL } from "@/lib/config";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
// console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
export default function ConnectWithGoogle() {
    const router = useRouter()
    const number = useUserInfoStore(state => state.getPhoneNumber())
    const setEmail = useUserInfoStore(state => state.setEmail)

    return (
        <GoogleOAuthProvider clientId={googleClientId!}>
            <div className="flex justify-center items-center h-30">
                <div className="">
                    <GoogleLogin onSuccess={async (cre) => {

                        // console.log("credential",cre.credential, "number->", number )
                        const res = await fetch(`${BACKEND_URL}/auth/google/callback`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                idToken: cre.credential,
                                number: number
                            }),
                        });
                        const data = await res.json()
                        console.log(data)
                        if (res.ok) {
                            // optionally store returned email
                            if (data?.email) setEmail(data.email)
                            router.push('/')
                        }

                    }} />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}
