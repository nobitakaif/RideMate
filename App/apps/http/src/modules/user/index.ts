import Elysia from "elysia";
import { UserModel } from "./model";
import { UserAuthService } from "./service";

export const userAuth = new Elysia({prefix : "/auth"})
    .post("/number/sent", async  ({ body })=>{
        const { number } = body
        const res = await UserAuthService.sentOTP({number})
        if('status' in res){
            return {
                msg : res.msg
            }
        }

        return {
            success : res.success,
            msg : res.msg
        }
    }, {
       body : UserModel.sentOTPSchema 
    })
    .post("/number/verify", async ({ body }) =>{
        const { otp, number } = body
        const res = await UserAuthService.verifyOTP({ otp, number })
        if(res.success){
            return {
                success : res.success,
                msg : res.msg
            }
        }
        return {
            success : res.success,
            msg : res.msg
        }
    }, {
        body : UserModel.verifyOTPSchema
    })