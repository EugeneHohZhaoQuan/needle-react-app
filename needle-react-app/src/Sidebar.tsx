import { Logo, Content } from './Sidebar.styles';

export const Sidebar = () => {
  return (
    <div style={{ width: '200px', background: '#f4f4f4' }}>
      <Logo>
        <a>logo</a>
      </Logo>
      <Content selected={true}>Feed</Content>
      <Content>About</Content>
      <Content>Contact</Content>
    </div>
  );
};
