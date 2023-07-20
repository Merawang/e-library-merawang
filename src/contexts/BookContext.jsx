import { createContext, useReducer } from "react";

export const BookContext = createContext();

export const bookReducer = (state, action) => {
    switch (action.type) {
        case 'get_books':
            return {
                books: action.payload
            }
        case 'added_book':
            return {
                books: [action.payload, ...state.books]
            }
        case 'changed_book':
            return {
                books: state.books.map((item) => { return item._id !== action.payload._id ? item : action.payload }).sort((a, b) => { return Number(b.createdAt) - Number(a.createdAt) })
            }
        case 'deleted_book':
            return {
                books: state.books.filter((item) => { return item._id !== action.payload._id })
            }
        default:
            return state
    }
}

const BookContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bookReducer, {
        books: []
    });

    return (
        <BookContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BookContext.Provider>
    );
}

export default BookContextProvider;