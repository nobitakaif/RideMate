import Elysia, { status, t } from "elysia";
import { OwnerVehicleModel } from "./model";
import jwt from "@elysia/jwt";
import { OwnerVehicleService } from "./service";



export const vehicle = new Elysia({ prefix: "/my_vehicle" })
    .use(
        jwt({
            name: "jwt",
            secret: process.env.JWT_SECRET!
        })
    ).
    derive(async ({ cookie: { auth }, jwt, headers }) => { 
        if (!auth.value) {
            console.log(auth.value)
            return status(400, {
                msg: "your not logged in!"
            })
        }
        console.log("auth value -> ", auth.value)
        const token = auth.value as string
        try{
            const decodedToken = await jwt.verify(token)
            if(!decodedToken){
                return status(401,{
                    msg : "invalid token!"
                })
            }
            console.log("userId -> ", decodedToken.userId)
            return {
                userId : decodedToken.userId
            }
        }catch(e){
            return status(401,{
                msg : "something went wrong!"
            })
        }
        

    })
    .post("/add", async ({ userId, body }) => { // user can add their vehicle 

        const res = await OwnerVehicleService.addVehicle({ownerId : userId , body : body})
        if( res.success == 'success'){
            return status(200, {
                success : res.success,
                msg : res.msg
            })
        }

        return status(400, {
            error : res.error,
            success : res.success
        })
    }, {
        body : OwnerVehicleModel.addVehicleSchema,

        response: {
            200 : OwnerVehicleModel.addVehicleSuccess,
            400 : OwnerVehicleModel.addVehicleFailed
        }
    })
    .post("/photo", async ({ body })=>{ // for uploading the vehicle photo
        const { url, vehicleId } = body
        const res = await OwnerVehicleService.uploadVehiclePhoto({url, vehicleId})
        if(res.success == 'success'){
            
            return status(200, {
                success : res.success,
                msg : res.msg
            })
        }
        return status(400, {
            success : res.success,
            error : res.error,
        })
    },{
        body : OwnerVehicleModel.addVehiclePhoto,
        response : {
            200 : OwnerVehicleModel.addVehiclePhotoSuccess,
            400 : OwnerVehicleModel.addVehiclePhotoFailed
        }
    })
    .get("/:id", async ({ params }) =>{ // get vehicle by id
        const { vehicleId }  = params
        const res = await OwnerVehicleService.getVehicleById({vehicleId : vehicleId})
        if(res.success == "success"){
            return status(200, {
                success : res.success,
                vehicle : res.vehicle
            })
        }
        return status(400, {
            success : res.success,
            msg : res.msg,
            error : res.error
        })
    }, {
        // body : OwnerVehicleModel.,
        params : t.Object({
            vehicleId : t.String()
        }),
        response : {
            200 : OwnerVehicleModel.getVehicleByIdSuccess,
            400 : OwnerVehicleModel.getVehicleByIdFailed
        }
    })
    .get("/list", async ({ userId })=>{ // get all the vehicle listed by owner/user
        const res = await OwnerVehicleService.getAllOwnerVehicle({ userId })
        if(res.success == "success"){
            return status(200, {
                list : res.list,
                success : res.success
            })
        }
        return status(400, {
            success : res.success,
            msg : res.msg, 
            error : res.error
        })
    }, {
        response :{
            200 : OwnerVehicleModel.getAllOwnerVehicleSuccess,
            400 : OwnerVehicleModel.getAllOwnerVehicleFailed
        }
    })
    .get("/booking_list", async({ userId })=>{ // to see how many booking owner has 
        const res = await OwnerVehicleService.myBooking({ userId })
        if(res.success == "success"){
            return status(200, {
                success : res.success,
                vehicles : res.vehicles
            })
        }
        return status(400,{
            success : res.success,
            error : res.error,
            msg : res.msg
        })
    },{
        response : {
            200 : OwnerVehicleModel.myBookingSuccess,
            400  : OwnerVehicleModel.myBookingFailed
        }
    })
    .post("/:bookingId/accept", async ({ userId, params })=>{
            const res = await OwnerVehicleService.acceptBooking({
                bookingId : params.bookingId,
                ownerId : userId
            })
            if(res.success === "success"){
                return status(200, res)
            }
            return status(400, res)
        }, {
            params : OwnerVehicleModel.acceptBookingSchema,
            response : {
                200 : OwnerVehicleModel.acceptBookingSuccess,
                400 : OwnerVehicleModel.acceptBookingFailed
            }
        })
    .put("/:vehicleId", async()=>{ // owner can update their vehicle details

    })
    .delete("/:vehicleId", async()=>{ // owner can delete their vehicle

    })