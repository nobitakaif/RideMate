import Elysia, { status, t } from "elysia";
import { VehicleModel } from "./model";
import jwt from "@elysia/jwt";
import { VehicleService } from "./service";



export const vehicle = new Elysia({ prefix: "/vehicle" })
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
    .post("/add", async ({ userId, body }) => {

        const res = await VehicleService.addVehicle({ownerId : userId , body : body})
        if('msg' in res){
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
    .post("/photo", async ({ body })=>{
        const { url, vehicleId } = body
        const res = await VehicleService.uploadVehiclePhoto({url, vehicleId})
        if(res.success){
            
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
    .get("/myVehicle", async () =>{

    }, {
        body : VehicleModel.myVehicleListSchema
    })
    .get("/myVehicle/", ()=>{

    }, {

    })