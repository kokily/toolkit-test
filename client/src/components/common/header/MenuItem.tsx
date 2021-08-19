import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';

// Styles
const Container = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const ItemBox = styled.div<Props>`
  padding: 0.75rem 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${oc.gray[9]};
  cursor: pointer;
  &:hover {
    background: ${oc.teal[1]};
  }
`;

interface Props {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
}

const MenuItem: React.FC<Props> = ({ children, to, onClick }) => {
  const jsx = <ItemBox onClick={onClick}>{children}</ItemBox>;

  return to ? (
    <Container to={to} style={{ display: 'block' }}>
      {jsx}
    </Container>
  ) : (
    jsx
  );
};

export default MenuItem;
