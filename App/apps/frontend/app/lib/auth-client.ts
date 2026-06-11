import { createAuthClient } from "better-auth/react"

const authClient = createAuthClient()

export const signIn = async () =>{
    const data = await authClient.signIn.social({
        provider : "google",
    })
}