import { sendOTP, verifyOTP } from "../../lib/twilio";
import { UserModel } from "./model";
import { prisma } from "@repo/db"

export abstract class UserAuthService{
    static async sentOTP ({ number } : UserModel.SentOTPSchema) {
        const res = await sendOTP(number)
        
        if('status' in res){
            return {
                status : res.status,
                msg : "msg has been sent to your number"
            }
        }
        else{
            return {
                success : false,
                msg : "something went wrong pls retry!"
            }
        }
    }

    static async verifyOTP({ otp, number } : UserModel.VerifyOTPSchema){
        const res = await verifyOTP(otp, number)
        if(res?.success){
            return {
                success : true,
                msg : "phone number Verified"
            }
        }
        else{
            return {
                success : false,
                msg : "incorrect OTP"
            }
        }
    }

    static async userCreationViaPhone({ name, email, phoneNumber}: UserModel.UserScheme){
        try{
            const res = await prisma.user.create({
                data : {
                    name,
                    email,
                    isPhoneVerified : true,
                    phoneNumber : phoneNumber,
                }
            })
            
            
            return {
                id : res.id,
                success : true
            }
        
        }catch(e){
            return {
                success : false, 
                error : e
            }
        }
    } 
}