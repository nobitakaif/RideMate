import { createStore } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
export type PhoneNumberState = {
    phoneNumber: number | string, 
    email? : string,
    name : string
}
export type PhoneNumberAction = {
    getPhoneNumber: () => number | string,
    setPhoneNumber: (n : string | number ) => void,
    setEmail : (e : string) => void,
    getEmail : () => string | null, 
    setName : (e : string) => void,
    getName : () =>string
    
}
export type PhoneNumberStore = PhoneNumberState & PhoneNumberAction

export const defaultState: PhoneNumberState = {
    phoneNumber: "0000000000",
    email : "",
    name : ""
}

export const createPhoneNumberStore = (initialState: PhoneNumberState = defaultState) => {
    return createStore<PhoneNumberStore>()(
        persist((set, get) =>({
            ...initialState,
            getPhoneNumber : () => get().phoneNumber,
            setPhoneNumber : (phoneNumber : string|number) => set({phoneNumber }),
            setEmail : (e : string) => set({email : e}),
            getEmail : () => get().email ?? "",
            setName : (e : string )=> set({name : e}),
            getName : () => get().name
        }),{    
            name : "user-info-storage",
            storage : createJSONStorage(() =>localStorage),
            skipHydration : true
        })
    )
}


