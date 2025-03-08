import { createContext, useState, useEffect, useContext } from "react";

const WidthContext = createContext()

function WidthContextProvider({ children }) {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 900;
    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    return(
        <WidthContext.Provider value={{
            width,
            breakpoint,
        }}>
            {children}
        </WidthContext.Provider>
    )
}

function useWidthContext() {
    const context = useContext(WidthContext);
    if (!context) throw new Error("useWidthContext must be used within a WidthContextProvider");
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { WidthContextProvider, useWidthContext }