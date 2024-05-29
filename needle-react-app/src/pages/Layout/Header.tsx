import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { clearUsername } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

import { HeaderContainer, LogoutButton } from './Header.styles';

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
    <HeaderContainer>
      <LogoutButton onClick={() => handleLogout()}>Logout</LogoutButton>
    </HeaderContainer>
  );
};

export default Header;
