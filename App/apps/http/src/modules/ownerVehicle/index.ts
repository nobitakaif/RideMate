import Elysia, { status, t } from "elysia";
import { VehicleModel } from "./model";
import jwt from "@elysia/jwt";
import { VehicleService } from "./service";



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
            return status(200, {
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

        const res = await VehicleService.addVehicle({ownerId : userId , body : body})
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
        body : VehicleModel.addVehicleSchema,

        response: {
            200 : VehicleModel.addVehicleSuccess,
            400 : VehicleModel.addVehicleFailed
        }
    })
    .post("/photo", async ({ body })=>{ // for uploading the vehicle photo
        const { url, vehicleId } = body
        const res = await VehicleService.uploadVehiclePhoto({url, vehicleId})
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
        body : VehicleModel.addVehiclePhoto,
        response : {
            200 : VehicleModel.addVehiclePhotoSuccess,
            400 : VehicleModel.addVehiclePhotoFailed
        }
    })
    .get("/:id", async () =>{ // get vehicle by id

    }, {
        body : VehicleModel.myVehicleListSchema,
        params : t.Object({
            id : t.String()
        })
    })
    .get("/list", ({ userId })=>{ // get all the vehicle listed by owner/user
        
    }, {

    })
    .get("/location/:", async ()=>{

    },{
        params : t.Object({
            location : t.String()
        })

    })