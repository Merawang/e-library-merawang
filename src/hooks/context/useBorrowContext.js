import { useContext } from "react";
import { BorrowContext } from "@/contexts/BorrowContext";

export const useBorrowContext = () => {
    const context = useContext(BorrowContext);

    if (!context) {
        throw Error('Something bad occured on borrow context 😟')
    };

    return context;
}