import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('Something bad occured on auth context 😟')
    }

    return context;
}