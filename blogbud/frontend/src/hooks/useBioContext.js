import { BioContext } from '../context/BioContext';
import { useContext } from 'react';

export const useBioContext = () => {
    const context = useContext(BioContext);

    if (!context) {
        throw Error('useBioContext must be used within a BioContextProvider');
    }
    
    return context;
}
