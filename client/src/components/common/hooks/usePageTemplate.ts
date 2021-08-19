import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../libs/api/auth';
import { RootState } from '../../../libs/modules';

export default function usePageTemplate() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = useCallback(async () => {
    dispatch(logout());
  }, [dispatch]);

  return { user, onLogout };
}
