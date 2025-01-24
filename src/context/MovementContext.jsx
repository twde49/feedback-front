import { createContext, useState, useContext } from "react";

export const MovementContext = createContext();

export const MovementProvider = ({ children }) => {
    const [movement, setMovement] = useState(null); // Shared state for movement

    return (
        <MovementContext.Provider value={{ movement, setMovement }}>
            {children}
        </MovementContext.Provider>
    );
};

export const useMovement = () => useContext(MovementContext);
