import  { App } from "@repo/http/app"
import { treaty } from "@elysiajs/eden"

export const client = treaty<App>("localhost:8000",{
    fetch :{
        credentials : "include"
    }
})