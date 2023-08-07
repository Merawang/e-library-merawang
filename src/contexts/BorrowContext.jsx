import { createContext, useReducer } from "react";

export const BorrowContext = createContext();

export const borrowReducer = (state, action) => {
    switch (action.type) {
        case 'get_borrows':
            return {
                borrows: action.payload
            }
        case 'added_borrow':
            return {
                borrows: [action.payload, ...state.borrows]
            }
        case 'changed_borrow':
            return {
                borrows: state.borrows.map((item) => { return item._id !== action.payload._id ? item : action.payload }).sort((a, b) => { return Number(b.createdAt) - Number(a.createdAt) })
            }
        case 'deleted_borrow':
            return {
                borrows: state.borrows.filter((item) => { return item._id !== action.payload._id })
            }
        default:
            return state
    }
}

const BorrowContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(borrowReducer, {
        borrows: []
    });

    return (
        <BorrowContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BorrowContext.Provider>
    );
}

export default BorrowContextProvider;