
import Header from "@/components/Header/Header";
import HomePage from "@/components/Landing Page/homepage";
import { client } from "@/config/elysiaClient";
import { BACKEND_URL } from "@/lib/config";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { cookies, headers } from "next/headers";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)

export default async function Home() {
  const cookie = await cookies()
  const session = cookie.get("auth")
  

  return (
    <div className="h-screen bg-[#1C1C17]">
      <Header />
      <HomePage/>
    </div>
  );
}
