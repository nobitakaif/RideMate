import Elysia, {  t } from "elysia";
import { UserModel } from "./model";
import { UserAuthService } from "./service";
import { OAuth2Client } from "google-auth-library";
import jwt from "@elysia/jwt";

const googleClientId = process.env.GOOGLE_CLIENT_ID
const GoogleOAuthClient = new OAuth2Client(googleClientId)

export const userAuth = new Elysia({prefix : "/auth"})
    .post("/number/sent", async  ({ body, status })=>{
        const { number } = body
        const res = await UserAuthService.sentOTP({number})
        if('status' in res){
            return status(200,{
                msg : res.msg
            })
        }

        return status(400,{
            success : res.success,
            msg : res.msg
        })
    }, {
       body : UserModel.sentOTPSchema,
       response : {
        200 : t.Any(),
        400 : t.Any()
       }
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
    
    // link with google 
    .post("/google/callback", async ({ body })=>{
        console.log("body -> ",body)
        
        console.log("GOOGLE_CLIENT_ID -> ",googleClientId)
        const ticket = await GoogleOAuthClient.verifyIdToken({
            idToken : body.idToken,
            audience : googleClientId
        })
        console.log("ticket -> ",ticket)
        const payload = ticket.getPayload()
        console.log("payload -> ", payload)
        const number = "+919670510494"
        const res = await UserAuthService.verifyGoogleAccount({phoneNumber : body.number, payload})
        return {
            res : res?.msg, 
            allRes : res
        }
        
        
    },{
        body : t.Any()
    })
    .use(
        jwt({
            name : "jwt",
            secret : process.env.JWT_SECRET!
        })
    )
    // # TODO : this route only should be accessible if user is already verified with their number 
    .post("/number", async ({ body, cookie : { auth }, jwt }) =>{
        const { name, phoneNumber } = body
        const res = await UserAuthService.userCreationViaPhone({ name, phoneNumber, })
        const token = await jwt.sign({userId : res.id})
        auth.set({
            value : token, 
            httpOnly : true,
            maxAge : 7 * 86400, // days,
            path : "/"
        })
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
    .get("/me", async ({ jwt, query }) =>{
        const { session } = query

        const decodedToken = await jwt.verify(session)
        if(!decodedToken || typeof decodedToken != "string"){
            return {

            }
        }
        decodedToken
    }, {
        query : t.Object({
            session : t.String()
        })
    })