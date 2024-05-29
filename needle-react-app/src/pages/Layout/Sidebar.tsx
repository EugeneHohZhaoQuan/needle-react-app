import {
  Logo,
  Content,
  Container,
  SidebarContainer,
  ButtonContainer,
  LogoutButton,
} from './Sidebar.styles';

import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { clearUsername } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

import logoutIcon from '../../assets/logout.svg';
import homeIcon from '../../assets/home.svg';
import userIcon from '../../assets/user.svg';
import geatIcon from '../../assets/gear.svg';

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
          <a>woofwoof</a>
        </Logo>
        <Content selected={true}>
          <img src={homeIcon} alt="Heart Icon" />
          Feed
        </Content>
        {/* <Content>
          <img src={geatIcon} alt="Heart Icon" />
          About
        </Content>
        <Content>
          <img src={userIcon} alt="Heart Icon" />
          Contact
        </Content> */}

        <ButtonContainer>
          <img src={logoutIcon} alt="Heart Icon" />
          <LogoutButton onClick={() => handleLogout()}>Log out</LogoutButton>
        </ButtonContainer>
      </SidebarContainer>
    </Container>
  );
};
