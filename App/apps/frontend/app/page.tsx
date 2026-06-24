
import { client } from "@/config/elysiaClient";
import { BACKEND_URL } from "@/lib/config";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { cookies } from "next/headers";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)

export default async function Home() {
  const cookie = await cookies()
  const session = cookie.get("auth")
  // client.api.v1.auth.
  return (
    <div>
      
    </div>
  );
}
