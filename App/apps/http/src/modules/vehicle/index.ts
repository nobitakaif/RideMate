import Elysia, { status } from "elysia";
import { VehicleModel } from "./model";
import jwt from "@elysia/jwt";

export const vehicle = new Elysia({prefix : "/vehicle"})
    .use(
        jwt({
            name : "jwt",
            secret : process.env.JWT_SECRET!
        })
    ).
    derive(async ({cookie : {auth},jwt, headers})=>{
        if(!auth.value){
            console.log(auth.value)
            return status(200,{
                msg : "your not logged in!"
            })
        }
        console.log("auth value -> ",auth.value)
    })
    .post("/add", async ({  })=>{
        return {
            msg : "alright"
        }
    }, {
        // body : VehicleModel.addVehicleSchema,
        response : {
            // 200 : VehicleModel.addVehicleSuccess
        }
    })