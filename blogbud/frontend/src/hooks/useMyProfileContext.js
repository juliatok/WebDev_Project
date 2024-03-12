import { useContext } from 'react';
import MyProfileContext from '../context/myprofileContext';

const useMyProfileContext = () => {
  return useContext(MyProfileContext);
};

export default useMyProfileContext;
