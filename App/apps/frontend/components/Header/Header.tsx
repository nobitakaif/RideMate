import HeaderOption from "./HeaderOption";
import MainLogo from "./MainLogo";
import UserAvatar from "./UserAvatar";
 
export default function Header() {
    return <div className="h-18 p-3 w-full flex justify-between bg-[#1C1C17] items-center border-b ">
        <MainLogo type="primary" />
        <HeaderOption/>
        <UserAvatar/>
    </div>
}