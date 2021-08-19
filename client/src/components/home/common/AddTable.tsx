import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

// Styles
const Container = styled.table`
  tr {
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
  th,
  td {
    width: 160px;
    border-radius: 8px;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    text-align: center;
    input {
      width: 75%;
      height: 1.5rem;
      padding: 0.5rem;
      border-radius: 4px;
      outline: none;
    }
  }
  th {
    background: ${oc.indigo[4]};
    color: white;
  }
`;

interface Props {
  menu: MenuType;
  price: number;
  onChangePrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddTable: React.FC<Props> = ({ menu, price, onChangePrice }) => {
  return (
    <Container>
      <tbody>
        <tr>
          <th>구 분</th>
          <td>{menu.name}</td>
        </tr>
        <tr>
          <th>단 가</th>
          <td>
            {menu.price === 0 ? (
              <input
                type="number"
                name="price"
                value={price}
                onChange={onChangePrice}
              />
            ) : (
              <>
                {menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </>
            )}
          </td>
        </tr>
        <tr>
          <th>단 위</th>
          <td>{menu.unit}</td>
        </tr>
      </tbody>
    </Container>
  );
};

export default AddTable;
