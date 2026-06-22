"use client"

import { type ReactNode, createContext, useState, useContext} from "react"
import { useStore } from "zustand"

import { type PhoneNumberAction, PhoneNumberStore, createPhoneNumberStore } from "@/config/phoneStore"

export  type PhoneNumberStoreApi = ReturnType<typeof createPhoneNumberStore>

export const PhoneNumberStoreContext = createContext<PhoneNumberStoreApi | undefined>(undefined)

export interface PhoneNumberStoreProvider {
    children : ReactNode
}

export const PhoneNumberProvider =({
    children 
}: PhoneNumberStoreProvider) =>{
    const [number ] = useState(() => createPhoneNumberStore())
    return (
        <PhoneNumberStoreContext.Provider value={number}>
            {children}
        </PhoneNumberStoreContext.Provider>
    )
}

export const usePhoneNumberStore = <T,>(
  selector: (store: PhoneNumberStore) => T,
): T => {
  const phoneNumberStoreContext = useContext(PhoneNumberStoreContext)
  if (!phoneNumberStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(phoneNumberStoreContext, selector)
}
