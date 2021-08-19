import React from 'react';

interface Props {
  menu: MenuType;
  price: number;
  count: number;
  onChangeCount: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddInput: React.FC<Props> = ({ menu, price, count, onChangeCount }) => {
  return (
    <>
      <div className="number">
        <label htmlFor="count">수 량 : </label>
        <input
          type="number"
          name="count"
          value={count}
          onChange={onChangeCount}
          autoFocus
        />
      </div>

      <div className="total">
        <h3>
          합계 금액:{' '}
          {menu.price === 0 ? (
            <>
              {(price * count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </>
          ) : (
            <>
              {(menu.price * count)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </>
          )}
        </h3>
      </div>
    </>
  );
};

export default AddInput;
