import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../../libs/styles';

// Styles
const Container = styled.div`
  color: white;
  ${shadow(1)};
  font-size: 1.215rem;
  font-weight: 700;
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  &.현역 {
    background: ${oc.cyan[6]};
  }
  &.예비역 {
    background: ${oc.lime[5]};
  }
  &.일반 {
    background: ${oc.orange[4]};
  }
  -webkit-filter: brightness(0.9);
  filter: brightness(0.9);
  &:hover {
    -webkit-filter: brightness(1);
    filter: brightness(1);
  }
  &:active {
    transform: translateY(3px);
  }
`;

interface Props {
  item: MenuType;
  onMenu: (id: string) => void;
}

const ListMenuItem: React.FC<Props> = ({ item, onMenu }) => {
  return (
    <Container className={item.native} onClick={() => onMenu(item.id)}>
      {item.name}
      {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} |{' '}
      {item.native}
    </Container>
  );
};

export default ListMenuItem;
