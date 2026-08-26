import jwt from "@elysia/jwt";
import Elysia, { status } from "elysia";
import { VehicleBookingModel } from "./model";
import { BookingService } from "./service";


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
        
        const res = await BookingService.makeBooking({
            endAt : body.endAt,
            renterId : userId,
            stateAt : body.stateAt,
            totalPrice : body.totalPrice,
            vehicleId : body.vehicleId,
            
        })
        if(res.success == "success"){
            return status(200, {
                success : res.success,
                data : {
                    bookingId : res.data.bookingId,
                    endedAt : res.data.endedAt,
                    startedAt : res.data.startedAt,
                    ownerName : res.data.ownerName,
                    totalFare : res.data.totalFare,
                    vehicleId : res.data.vehicleId
                }
            })
        }
        return status(400, {
            success : res.success,
            msg : res.msg,
            error : res.error
        })
        
    }, {
        body : VehicleBookingModel.makeBookingSchema,
        response : {
            200 : VehicleBookingModel.makeBookingSuccess,
            400 : VehicleBookingModel.makeBookingFailed
        }
    })
    .post("/:bookingId/accept", async ({ userId, params })=>{
        const res = await BookingService.acceptBooking({
            bookingId : params.bookingId,
            ownerId : userId
        })
        if(res.success === "success"){
            return status(200, res)
        }
        return status(400, res)
    }, {
        params : VehicleBookingModel.acceptBookingSchema,
        response : {
            200 : VehicleBookingModel.acceptBookingSuccess,
            400 : VehicleBookingModel.acceptBookingFailed
        }
    })
    .get("/notifications", async ({ userId })=>{
        const res = await BookingService.getNotifications(userId)
        if(res.success === "success"){
            return status(200, res)
        }
        return status(400, res)
    }, {
        response : {
            200 : VehicleBookingModel.notificationsSuccess,
            400 : VehicleBookingModel.acceptBookingFailed
        }
    })