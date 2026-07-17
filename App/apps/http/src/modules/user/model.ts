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

    export const getUserInfoSuccess = t.Object({
        user : t.Object({
            email : t.String({format : "email"}),
            name : t.String({maxLength : 20}),
            avatar : t.String({})
        }),
        success : t.Boolean({default : true})
    })
    export type GetUserInfoSuccess = typeof getUserInfoSuccess.static

    export const getUserInfoFailed = t.Object({
        success : t.Boolean({default : false}),
        error : t.String()
    })
    export type GetUserInfoFailed = typeof getUserInfoFailed.static
}