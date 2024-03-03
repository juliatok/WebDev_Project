import {BlogContext} from '../context/blogContext';
import {useContext} from 'react';

export const useBlogContext = () => {
    const context = useContext(BlogContext);

    if (!context) {
        throw Error('useBlogContext must be used within a BlogContextProvider');
    }
    
    return context
}   