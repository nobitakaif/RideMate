import Elysia, { t } from "elysia";
import { UserModel } from "./model";
import { UserAuthService } from "./service";
import { OAuth2Client } from "google-auth-library";

const googleClientId = process.env.GOOGLE_CLIENT_ID
const GoogleOAuthClient = new OAuth2Client(googleClientId)

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
    .post("/google/callback", async ({ body })=>{
        console.log(body)
        
        console.log("GOOGLE_CLIENT_ID -> ",googleClientId)
        const ticket = await GoogleOAuthClient.verifyIdToken({
            idToken : body.idToken,
            audience : googleClientId
        })
        console.log("ticket -> ",ticket)
        const payload = ticket.getPayload()
        console.log("payload -> ", payload)
        const number = "+919670510494"
        await UserAuthService.verifyGoogleAccount({phoneNumber : number, payload})
        return {
            payload
        }
        
        try{
            
            
        }catch(e){
            console.log(e)
        }
    },{
        body : t.Any()
    })