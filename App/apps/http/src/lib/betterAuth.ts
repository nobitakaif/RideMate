import { prisma } from "@repo/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthClient } from "better-auth/react"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    socialProviders : {
        google : {
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET!
        }
    },
    database : prismaAdapter(prisma, {
        provider : "postgresql"
    }),
    // emailAndPassword: {
    //     enabled: true,
    //     requireEmailVerification: true,
    // },

    // emailVerification: {
    //     sendOnSignUp: true,

    //     async sendVerificationEmail({ user, url }) {
    //         await resend.emails.send({
    //             from: "noreply@yourdomain.com",
    //             to: user.email,
    //             subject: "Verify your email",
    //             html: `
    //                 <h1>Verify Email</h1>
    //                 <a href="${url}">
    //                     Verify Account
    //                 </a>
    //             `
    //         });
    //     },
    // }
})

export const authClient = createAuthClient({
    baseURL : "http://localhost:8000"
})