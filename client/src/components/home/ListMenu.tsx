import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import ListMenuItem from './common/ListMenuItem';

// Styles
const Container = styled.div`
  margin-bottom: 6rem;
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }
`;

const MenuBox = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

interface Props {
  menu: ItemType[];
  onBack: () => void;
  onMenu: (id: string) => void;
}

const ListMenu: React.FC<Props> = ({ menu, onBack, onMenu }) => {
  return (
    <Container>
      {menu && (
        <>
          <div className="title">
            <h2>{menu[0] && menu[0].divide}</h2>
            <Button cancel onClick={onBack}>
              뒤 로
            </Button>
          </div>

          <MenuBox>
            {menu.map((item) => (
              <ListMenuItem key={item.id} item={item} onMenu={onMenu} />
            ))}
          </MenuBox>
        </>
      )}
    </Container>
  );
};

export default ListMenu;
