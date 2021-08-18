import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../../libs/api/auth';
import { RootState } from '../../libs/modules';

export default function useMe() {
  const dispatch = useDispatch();
  const { meLoading, meError, auth } = useSelector(
    (state: RootState) => state.auth
  );

  const checkMe = useCallback(() => {
    dispatch(me());
  }, []);

  useEffect(() => {
    checkMe();
  }, []);

  return { auth, meLoading, meError };
}
