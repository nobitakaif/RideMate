import { Separator } from "../ui/separator";
import LeftSide from "./leftside";
import RightSide from "./rightside";

export default function HomePage(){
    return <div className="flex h-[90vh] w-full justify-center items-center">
        <LeftSide/>
        {/* <Separator/> */}
        <RightSide/>
    </div>
}