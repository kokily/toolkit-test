import styled from 'styled-components';
import HomeMenu from './common/HomeMenu';

// Styles
const Container = styled.div`
  margin-top: 1rem;
  margin-bottom: 6rem;
`;

const MenuBox = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  margin-bottom: 1rem;
`;

interface Props {
  menu: HomeMenuType[];
  native: string;
  onMenu: (divide: string) => void;
}

const Home: React.FC<Props> = ({ menu, native, onMenu }) => {
  return (
    <Container>
      <MenuBox>
        {native === 'soldier' &&
          menu.map((item) => (
            <HomeMenu
              key={item.id}
              divide={item.divide}
              onMenu={() => onMenu(item.divide)}
              soldier
            />
          ))}
        {native === 'reserve' &&
          menu.map((item) => (
            <HomeMenu
              key={item.id}
              divide={item.divide}
              onMenu={() => onMenu(item.divide)}
              reserve
            />
          ))}
        {native === 'general' &&
          menu.map((item) => (
            <HomeMenu
              key={item.id}
              divide={item.divide}
              onMenu={() => onMenu(item.divide)}
              general
            />
          ))}
      </MenuBox>
    </Container>
  );
};

export default Home;
