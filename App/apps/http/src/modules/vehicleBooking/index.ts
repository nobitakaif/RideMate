import jwt from "@elysia/jwt";
import Elysia, { status } from "elysia";
import { VehicleBookingModel } from "./model";


export const vehicleBooking = new Elysia({prefix : "/booking"})
    .use(
        jwt({
            name : "jwt", 
            secret : process.env.JWT_SECRET!
        })
    )
    .derive(async ({cookie : {auth}, jwt})=>{
        if(!auth.value){
            console.log("this user is not logged in no auth value", auth.value)
            return status(400, {
                msg : "your not logged in :("
            })
        }
        const token = auth.value as string 
        try{
            const decodedToken = await jwt.verify(token)
            if(!decodedToken){
                return status(401, {
                    msg : "invalid token!"
                })
            }
            console.log("userId -> ", decodedToken.userId)
            return {
                userId : decodedToken.userId
            }
        }
        catch(e){
            return status(401, {
                msg : "token incorrect!"
            })
        }
    })
    .post("/make", async ({ userId, body })=>{
        const { vehicleId } = body
        
    }, {
        body : VehicleBookingModel.makeBookingSchema
    })