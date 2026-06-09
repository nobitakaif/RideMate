import * as twilio from 'twilio';

const accountSid: string = process.env.TWILIO_ACCOUNT_SID!
const authToken: string = process.env.TWILIO_AUTH_TOKEN!;
const client = new twilio.Twilio(accountSid, authToken);
const verifyServiceId = process.env.TWILIO_VERIFY_SERVICE_ID!

export async function sendOTP(to: string): Promise<string | any> {
    try{
        const verification = await client.verify.v2.services(verifyServiceId)
            .verifications.create({
                to,
                channel : "sms"
            })

        return {
            status : verification.status
        }
    }catch(e){
        return {
            error : e
        }
    }
    
    
}

export async function verifyOTP(otp : string, to : string ){
    try{
        const isVerified = await client.verify.v2.services(verifyServiceId)
            .verificationChecks.create({
                code : otp,
                to : to
            })

        if(isVerified.status === 'approved'){
            return {
                msg : "OTP is correct",
                success : true,
                status : isVerified.status
            }
        }
    }catch(e){
        return  {
            success : false,
            msg : 'incorrect OTP',
            status : "FAILED"
        }
    }
}

