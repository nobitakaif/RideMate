
import { client } from "@/config/elysiaClient"
import { cookies } from "next/headers"
import Link from "next/link"
import { Button } from "../ui/button"

export default async function UserAvatar(){
    const cookiesStore = await cookies()
    const token =  cookiesStore.get("auth")?.value
    console.log("token -> ",token)
    console.log("token -> ",token)
    if(!token){
        return <div className="flex justify-start ">
            <Button><Link href={"/login"}>Login</Link></Button>
        </div>
    }
    const user = await client.api.v1.auth.me.get({query : {session : token}})
    console.log(user.data?.user.avatar)
    return <div className="">
        <img src={user.data?.user.avatar} alt="" className="h-10 w-12 rounded-full"/>
    </div>
}