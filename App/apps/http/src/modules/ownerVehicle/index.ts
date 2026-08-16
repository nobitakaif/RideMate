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
    .get("/:id", async () =>{ // get vehicle by id
        
    }, {
        // body : OwnerVehicleModel.,
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