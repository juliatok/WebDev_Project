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
                ...state,
                blogs: [action.payload, ...state.blogs]
            };
        case 'UPDATE_BLOG':
            return {
                ...state,
                blogs: state.blogs.map((b) => b._id === action.payload._id ? action.payload : b),
                userBlogs: state.userBlogs ? state.userBlogs.map((b) => b._id === action.payload._id ? action.payload : b) : []
            };
        case 'DELETE_BLOG':
            return {
                blogs: state.blogs.filter((b) => b._id !== action.payload._id)
            };

        case 'CLEAR_BLOGS':
            return {
                ...state,
                blogs: [], // Clear the blogs
            };
        default:
            return state;
    }
};


export const BlogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogsReducer, {
      blogs: []
    })
  
    return (
      <BlogContext.Provider value={{...state, dispatch}}>
        { children }
      </BlogContext.Provider>
    );
  };
