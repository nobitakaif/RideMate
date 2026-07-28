import Header from "@/components/Header/Header";
import React from "react";

export default function ProtectedLayout({ children } : {children : React.ReactNode}){
    return (<>
        <Header/>
        {children}
    </>)
}