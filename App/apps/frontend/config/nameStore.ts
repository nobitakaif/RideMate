import { createStore } from "zustand";
import { createJSONStorage, persist, } from "zustand/middleware"

export type NameState = {
    name : string   | null
}

export type NameAction = {
    setName : (e:string) => void,
    getName : () => string | null  
}
export type NameStore = NameAction & NameState

export const defaultNameStore : NameState = {
    name  : ""
}

export const createNameStore = (initialState : NameState = defaultNameStore) =>{
    return createStore<NameStore>()(
        persist((set, get)=>({
            ...initialState,
            getName() {
                return get().name
            },
            setName (e : string) {
                set({name : e})
            }

        }),{
            name : "name-storage",
            storage : createJSONStorage(() =>localStorage),
            skipHydration : true
        })
    )
}