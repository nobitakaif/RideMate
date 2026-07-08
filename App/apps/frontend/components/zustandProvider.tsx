// components/zustandProvider.tsx
"use client"

import { type ReactNode, createContext, useState, useContext, useEffect } from "react"
import { useStore } from "zustand"
import { type PhoneNumberStore, createPhoneNumberStore } from "@/config/phoneStore"
import { createNameStore } from "@/config/nameStore"

export type PhoneNumberStoreApi = ReturnType<typeof createPhoneNumberStore>

export const PhoneNumberStoreContext = createContext<PhoneNumberStoreApi | undefined>(undefined)

export interface PhoneNumberStoreProvider {
    children: ReactNode
}

export const UserInfoProvider = ({ children }: PhoneNumberStoreProvider) => {
    // Create store once
    const [store] = useState(() => createPhoneNumberStore())
    

    // Manually rehydrate the store on mount (because we used skipHydration: true)
    useEffect(() => {
        // Check if persist API exists and rehydrate
        if (store.persist) {
            store.persist.rehydrate()
        }

    }, [store])

    return (
        <PhoneNumberStoreContext.Provider value={store}>
            {children}
        </PhoneNumberStoreContext.Provider>
    )
}

export const useUserInfoStore = <T,>(
    selector: (store: PhoneNumberStore) => T,
): T => {
    const phoneNumberStoreContext = useContext(PhoneNumberStoreContext)
    if (!phoneNumberStoreContext) {
        throw new Error(`usePhoneNumberStore must be used within PhoneNumberProvider`)
    }
    return useStore(phoneNumberStoreContext, selector)
}   