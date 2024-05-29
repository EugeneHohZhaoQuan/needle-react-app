import {
  Logo,
  Content,
  Container,
  SidebarContainer,
  ButtonContainer,
  LogoutButton,
} from './Sidebar.styles';

import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { clearUsername } from './store/userSlice';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
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
    <Container>
      <SidebarContainer>
        <Logo>
          <a>logo</a>
        </Logo>
        <Content selected={true}>Feed</Content>
        <Content>About</Content>
        <Content>Contact</Content>

        <ButtonContainer>
          <LogoutButton onClick={() => handleLogout()}>Logout</LogoutButton>
        </ButtonContainer>
      </SidebarContainer>
    </Container>
  );
};
