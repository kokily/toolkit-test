import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import { listItems } from '../../../libs/api/items';
import { RootState } from '../../../libs/modules';

export default function useListMenu() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { items, listItemsLoading } = useSelector(
    (state: RootState) => state.items
  );

  type QueryType = {
    native?: string;
    divide?: string;
  };

  const onBack = () => {
    history.goBack();
  };

  const onMenu = (id: string) => {
    history.push(`/menu/${id}`);
  };

  useEffect(() => {
    const { native, divide }: QueryType = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(listItems({ native, divide }));
  }, [location.search, dispatch]);

  return {
    items,
    onBack,
    onMenu,
    listItemsLoading,
  };
}
