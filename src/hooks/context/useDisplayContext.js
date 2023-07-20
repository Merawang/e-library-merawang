import { useContext } from "react";
import { DisplayContext } from "@/contexts/DisplayContext";

export const useDisplayContext = () => {
    const context = useContext(DisplayContext);

    if (!context) {
        throw Error('Something bad occured on display context 😟')
    };

    return context;
}