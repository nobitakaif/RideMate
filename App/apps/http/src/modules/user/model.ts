import { t } from "elysia";


export namespace UserModel{
    export const sentOTPSchema = t.Object({
        number : t.String()
    })
    export type SentOTPSchema = typeof sentOTPSchema.static
    
    export const verifyOTPSchema = t.Object({
        otp : t.String(),
        number : t.String()
    })
    export type VerifyOTPSchema = typeof verifyOTPSchema.static

    export const userSchema = t.Object({
        name : t.String(),
        
        phoneNumber : t.String(),
    })
    export type UserScheme = typeof userSchema.static
}