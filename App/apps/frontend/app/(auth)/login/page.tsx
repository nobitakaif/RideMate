import LeftSigninAuthPage from "@/components/leftAuth";
import RightAuthPage from "@/components/rightAuthPage";

export default function Auth(){
    return <div className="flex justify-center items-center h-screen w-full">
        <RightAuthPage/>
        <LeftSigninAuthPage/>
    </div>
}