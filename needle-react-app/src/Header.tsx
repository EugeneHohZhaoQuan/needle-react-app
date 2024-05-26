import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { setUsername, clearUsername } from './store/userSlice';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUsername());
      navigate('/');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <>
      <button onClick={() => handleLogout()}>Logout</button>
    </>
  );
};

export default Header;
