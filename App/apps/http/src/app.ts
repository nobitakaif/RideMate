import { Elysia } from "elysia";
import { userAuth } from "./modules/user";
import { cors } from "@elysia/cors"
import { vehicle } from "./modules/ownerVehicle";
import { vehicleBooking } from "./modules/vehicleBooking";



export const app = new Elysia({prefix : "/api/v1"})
  .use(cors({
    origin : ["http://localhost:3000","http://localhost:8000"]
  }))
  .use(userAuth)
  .use(vehicle)
  .use(vehicleBooking)
  .get("/", () => "Hello Elysia").listen(8000);

export type App = typeof app