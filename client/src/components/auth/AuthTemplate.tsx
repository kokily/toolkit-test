import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../libs/styles';

// Styles
const Container = styled.div`
  position: absolute;
  width: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: 0.5s ease-out 0s 1 fadeIn;
  ${shadow(1)};
  .logo {
    background: ${oc.cyan[5]};
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: white;
      font-size: 2.4rem;
      font-weight: 800;
      text-decoration: none;
      letter-spacing: 5px;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

interface Props {
  mode?: 'login' | 'register';
}

const AuthTemplate: React.FC<Props> = ({ mode, children }) => {
  return (
    <Container>
      <div className="logo">
        <Link to="/">{mode === 'login' ? '로그인' : '사원등록'}</Link>
      </div>

      {children}
    </Container>
  );
};

export default AuthTemplate;
