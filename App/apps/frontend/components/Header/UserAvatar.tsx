
import { client } from "@/config/elysiaClient"
import { cookies } from "next/headers"



export default async function UserAvatar(){
    const cookiesStore = await cookies()
    const token =  cookiesStore.get("auth")?.value
    console.log("token -> ",token)
    if(!token){
        return <div>

        </div>
    }
    const user = await client.api.v1.auth.me.get({query : {session : token}})
    console.log(user.response.status)
    return <div>
        
    </div>
}