"use client"

import { signIn } from "./lib/auth-client";

export default function Home() {
  return (
    <div>
      <button onClick={() =>{
        signIn()
      }}>login with google</button>
    </div>  
  );
}
