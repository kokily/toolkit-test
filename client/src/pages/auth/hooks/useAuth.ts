import React, { useCallback, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../libs/api/auth';

type StateProps = {
  username: string;
  password: string;
};

type ActionProps = {
  name: string;
  value: string;
};

const reducer = (state: StateProps, action: ActionProps) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

export default function useAuth() {
  const reduxDispatch = useDispatch();
  const [state, dispatch] = useReducer(reducer, {
    username: '',
    password: '',
  });
  const { username, password } = state;

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  }, []);

  const onLogin = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      reduxDispatch(login({ username, password }));
    },
    [username, password]
  );

  return {
    username,
    password,
    onChange,
    onLogin,
  };
}
