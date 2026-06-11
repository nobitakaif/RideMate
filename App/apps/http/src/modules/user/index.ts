import Elysia from "elysia";
import { UserModel } from "./model";
import { UserAuthService } from "./service";
import { auth, authClient } from "../../lib/betterAuth";

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
    .get("/number/verify", async ({ body }) =>{
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
    // # TODO : this route only should be accessible if user is already verified with their number 
    .post("/number", async ({ body }) =>{
        const { name,  email, phoneNumber } = body
        const res = await UserAuthService.userCreationViaPhone({ name, email, phoneNumber, })

        if('id' in res){
            return {
                id : res.id,
                success : res.success
            }
        }
        return {
            success : res.success, 
            error : res.error
        }
    },{
        body : UserModel.userSchema
    })
    // link with google 
    .get("/google/callback", async ()=>{
        try{
            
            
        }catch(e){
            console.log(e)
        }
    })