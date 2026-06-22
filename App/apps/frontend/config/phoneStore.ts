import { usePhoneNumberStore } from "@/components/zustandProvider"
import { createStore } from "zustand"

export type PhoneNumberState = {
    phoneNumber: number | string
}
export type PhoneNumberAction = {
    getPhoneNumber: () => number | string,
    setPhoneNumber: (n : string | number ) => void
}
export type PhoneNumberStore = PhoneNumberState & PhoneNumberAction

export const defaultState: PhoneNumberState = {
    phoneNumber: "0000000000"
}

export const createPhoneNumberStore = (initialState: PhoneNumberState = defaultState) => {
    return createStore<PhoneNumberStore>()((set, get) => ({
        ...initialState,
        getPhoneNumber: () => get().phoneNumber,
        setPhoneNumber: (phoneNumber : string | number ) => set({ phoneNumber : phoneNumber })
    }))
}


