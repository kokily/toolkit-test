import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../libs/styles';
import Button from '../common/Button';
import AddTable from './common/AddTable';
import AddInput from './common/AddInput';

// Styles
const Container = styled.div`
  position: absolute;
  width: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  ${shadow(1)};
  animation: 0.5s ease-out 0s 1 fadeIn;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .contents {
    background: white;
    padding: 1.5rem;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      outline: none;
      padding: 0.5rem;
      margin-left: 1rem;
      border-radius: 4px;
    }
  }
  .total {
    text-align: right;
    color: red;
    margin-bottom: 0;
    padding-bottom: 0.5rem;
    h3 {
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
`;

const Logo = styled.div`
  background: ${oc.red[5]};
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: 2px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: ${oc.red[1]};
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
`;

interface Props {
  menu: ItemType | null;
  count: number;
  onChangeCount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  price: number;
  onChangePrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onSubmit: (e: React.MouseEvent) => void;
}

const AddCart: React.FC<Props> = ({
  menu,
  count,
  onChangeCount,
  price,
  onChangePrice,
  onBack,
  onSubmit,
}) => {
  return (
    <>
      {menu && (
        <Container>
          <Logo>
            {menu.divide} | {menu.native}
          </Logo>

          <div className="contents">
            <AddTable menu={menu} price={price} onChangePrice={onChangePrice} />

            <hr />

            <AddInput
              menu={menu}
              price={price}
              count={count}
              onChangeCount={onChangeCount}
            />

            <ButtonWrapper>
              <Button submit onClick={onSubmit}>
                전표전송
              </Button>
              <Button cancel onClick={onBack}>
                취소하기
              </Button>
            </ButtonWrapper>
          </div>
        </Container>
      )}
    </>
  );
};

export default AddCart;
