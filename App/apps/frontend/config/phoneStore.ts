import { createStore } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
export type PhoneNumberState = {
    phoneNumber: number | string, 
    email? : string
}
export type PhoneNumberAction = {
    getPhoneNumber: () => number | string,
    setPhoneNumber: (n : string | number ) => void,
    setEmail : (e : string) => void,
    getEmail : () => string | null
}
export type PhoneNumberStore = PhoneNumberState & PhoneNumberAction

export const defaultState: PhoneNumberState = {
    phoneNumber: "0000000000",
    email : ""
}

export const createPhoneNumberStore = (initialState: PhoneNumberState = defaultState) => {
    return createStore<PhoneNumberStore>()(
        persist((set, get) =>({
            ...initialState,
            getPhoneNumber : () => get().phoneNumber,
            setPhoneNumber : (phoneNumber : string|number) => set({phoneNumber }),
            setEmail : (e : string) => set({email : e}),
            getEmail : () => get().email ?? ""
        }),{
            name : "phone-number-storage",
            storage : createJSONStorage(() =>localStorage),
            skipHydration : true
        })
    )
}


