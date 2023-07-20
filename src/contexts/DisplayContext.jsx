import { useState, createContext } from "react";

export const DisplayContext = createContext();

const DisplayContextProvider = ({ children }) => {

    const [isPending, setLoading] = useState(false);
    const [message, setMessage] = useState({ error: false, severity: '', message: '' });

    return (
        <DisplayContext.Provider value={{ isPending, message, setLoading, setMessage }}>
            {children}
        </DisplayContext.Provider>
    )
}

export default DisplayContextProvider;