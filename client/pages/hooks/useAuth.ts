import React, { useCallback, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../libs/api/auth';
import { RootState } from '../../libs/modules';

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
  const { loginLoading, loginError } = useSelector(
    (state: RootState) => state.auth
  );
  const [state, dispatch] = useReducer(reducer, {
    username: '',
    password: '',
  });
  const { username, password } = state;

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  }, []);

  const onLogin = (e: React.MouseEvent) => {
    e.preventDefault();

    if ([username, password].includes('')) {
      alert('빈 칸을 채우세요');
      return;
    }

    reduxDispatch(login({ username, password }));
  };

  const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();

    reduxDispatch(logout());
  };

  return {
    username,
    password,
    loginLoading,
    loginError,
    onChange,
    onLogin,
    onLogout,
  };
}
