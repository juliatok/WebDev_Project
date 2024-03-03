import { createContext, useReducer } from "react";

export const BlogContext = createContext();
export const blogsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_BLOGS':
            return {
                blogs: action.payload
            };
        case 'ADD_BLOG':
            return {
                blogs: [action.payload, ...state.blogs]
            };
        case 'DELETE_BLOG':
            return {
                blogs: state.blogs.filter((b) => b._id !== action.payload._id)
            };
        default:
            return state;
    }
}

export const BlogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogsReducer, {
        blogs: null
    })

    return (
        <BlogContext.Provider value={{...state, dispatch}}>
            { children }
        </BlogContext.Provider>
    );
}
