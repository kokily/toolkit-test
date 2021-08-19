import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';
import { AuthResponse } from '../../libs/api/auth';
import { media, shadow } from '../../libs/styles';
import useHeader from './hooks/useHeader';
import Apeach from './header/Apeach';
import MenuList from './header/MenuList';

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 0px;
  position: fixed;
  z-index: 20;
  ${shadow(1)};
`;

const WhiteBack = styled.div`
  display: flex;
  justify-content: center;
  background: white;
  height: auto;
`;

const Content = styled.div`
  width: 1200px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;

  ${media.large} {
    width: 992px;
  }

  ${media.medium} {
    width: 100%;
  }
`;

const Logo = styled(Link)`
  font-family: 'Rajahani';
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 2px;
  color: ${oc.teal[7]};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-shadow: 0.5px 0.5px;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

interface Props {
  user: AuthResponse;
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ user, onLogout }) => {
  const { toggle, setToggle, ref, onOutsideClick } = useHeader();

  return (
    <Container>
      <WhiteBack>
        <Content>
          <Logo to="/soldier">행사전표시스템</Logo>

          <Spacer />

          <>
            <div ref={ref}>
              <Apeach onClick={setToggle} />
            </div>

            <MenuList
              user={user}
              onClose={onOutsideClick}
              onLogout={onLogout}
              visible={toggle}
            />
          </>
        </Content>
      </WhiteBack>
    </Container>
  );
};

export default Header;
