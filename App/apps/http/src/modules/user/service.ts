import { success } from "better-auth/*";
import { sendOTP, verifyOTP } from "../../lib/twilio";
import { UserModel } from "./model";
import { prisma } from "@repo/db"



export abstract class UserAuthService{
    static async sentOTP ({ number } : UserModel.SentOTPSchema) {
        const res = await sendOTP(number)
        console.log(res)
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

    static async verifyGoogleAccount ({phoneNumber, payload} : {phoneNumber : string, payload : any}){
        try{
            const userId = await prisma.user.findFirst({
                where : {
                    phoneNumber,
                },
                select : {
                    id : true
                }
            })
            if(!userId?.id){
                return {
                    success : false,
                    msg : "phone number not found!"
                }
            }

            const updatedUser = await prisma.$transaction(async (txn) =>{
                const userInfo = await txn.user.update({
                    where : {
                        id : userId.id
                    },
                    data : {
                        email : payload.email,
                        isEmailVerified : true,
                        profileImage : payload.picture,
                        status : "VERIFIED",
                        accounts : {
                            create : {
                                provider : "PHONE",
                                id : userId.id,
                                providerAccountId : phoneNumber
                            }
                        }
                    }
                })
                if(!userInfo){
                    console.log("rollback transaction")
                }
                const userAccount = await txn.account.create({
                    data : {
                        userId : userInfo.id,
                        provider : "GOOGLE",
                        providerAccountId : payload.sub,
                    }
                })
                
            })
        }catch(e){

        }
    }
}