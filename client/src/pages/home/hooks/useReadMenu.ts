import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addCart } from '../../../libs/api/cart';
import { readItem } from '../../../libs/api/items';
import { RootState } from '../../../libs/modules';

export default function useReadMenu() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { item, readItemLoading } = useSelector(
    (state: RootState) => state.items
  );
  const { menuId }: { menuId: string } = useParams();
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);

  const onChangeCount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCount(parseInt(e.target.value));
    },
    []
  );

  const onChangePrice = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPrice(parseInt(e.target.value));
    },
    []
  );

  const onBack = () => {
    history.goBack();
  };

  const onAddCart = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      if (count < 1 || price < 1) {
        console.log(price, count);
        alert('단가 또는 수량을 입력하세요');
        return;
      }

      dispatch(addCart({ item_id: menuId, price, count }));
      history.goBack();
    },
    [dispatch, count, price]
  );

  useEffect(() => {
    dispatch(readItem({ id: menuId }));
  }, [dispatch]);

  useEffect(() => {
    if (item) {
      setPrice(item.price);
    }
  }, [item, setPrice]);

  return {
    menu: item,
    count,
    onChangeCount,
    price,
    onChangePrice,
    onBack,
    onAddCart,
    readItemLoading,
  };
}
