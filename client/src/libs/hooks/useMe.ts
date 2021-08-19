import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../api/auth';
import { RootState } from '../modules';

export default function useMe() {
  const dispatch = useDispatch();
  const { user, meLoading } = useSelector((state: RootState) => state.auth);

  const checkMe = useCallback(() => {
    dispatch(me());
  }, []);

  useEffect(() => {
    checkMe();
  }, []);

  return {
    user,
    meLoading,
  };
}
