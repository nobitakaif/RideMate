import { Elysia } from "elysia";
import { userAuth } from "./modules/user";
import { cors } from "@elysia/cors"



export const app = new Elysia({prefix : "/api/v1"})
  .use(cors({
    origin : ["http://localhost:3000"]
  }))
  .use(userAuth)
  .get("/", () => "Hello Elysia").listen(8000);

export type App = typeof app