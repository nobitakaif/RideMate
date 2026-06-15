"use client"

import { BACKEND_URL } from "@/lib/config";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)

export default function Home() {
  return (
    <GoogleOAuthProvider clientId={googleClientId!}>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-44 w-54">
          <GoogleLogin onSuccess={async (cre) =>{
            const res = await fetch(`${BACKEND_URL}/auth/google/callback`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  idToken: cre.credential,
                }),
              });
              console.log(res)
          }} />
        </div>
      </div>  
    </GoogleOAuthProvider>
  );
}
