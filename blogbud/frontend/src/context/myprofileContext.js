import { createContext, useReducer } from 'react';

export const MyProfileContext = createContext();
export const myProfileReducer = (state, action) => {
    switch (action.type) {
        case 'GET_MY_PROFILE':
        return {
            myProfile: action.payload
        };
        case 'UPDATE_MY_PROFILE':
        return {
            myProfile: action.payload
        };
        default:
        return state;
    }
    }

export const MyProfileContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(myProfileReducer, {
        myProfile: null
    });

    return (
        <MyProfileContext.Provider value={{...state, dispatch}}>
            { children }
        </MyProfileContext.Provider>
    );
}

export default MyProfileContext;
