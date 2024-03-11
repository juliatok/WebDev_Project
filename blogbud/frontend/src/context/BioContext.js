import { createContext, useReducer } from "react";

export const BioContext = createContext();

export const bioReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BIO':
            return {
                bio: action.payload
            };
        default:
            return state;
    }
}

export const BioContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bioReducer, {
        bio: ''
    });

    return (
        <BioContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BioContext.Provider>
    );
}
