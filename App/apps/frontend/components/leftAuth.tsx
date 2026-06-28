import Link from "next/link";
import SigninPage from "./signin";

export default function LeftSigninAuthPage(){
    return <div className="h-screen w-full bg-[#F0EEE8] flex justify-center items-center flex-col">
        <SigninPage/>
        <p>By continuing you agree to our <Link href={"#"} className="text-[#2D6A4F] hover:text-[#1F4F3A] underline">Terms</Link> and <Link href={"#"} className="text-[#2D6A4F] hover:text-[#1F4F3A] underline">Privacy policy</Link></p>
    </div>
}