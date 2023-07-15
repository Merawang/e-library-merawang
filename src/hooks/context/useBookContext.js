import { useContext } from "react";
import { BookContext } from "@/contexts/BookContext";

export const useBookContext = () => {
    const context = useContext(BookContext);

    if (!context) {
        throw Error('Something bad occured on contact context 😟')
    };

    return context;
}