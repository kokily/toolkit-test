import React, { useCallback, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from '../../../libs/api/auth';

type StateProps = {
  username: string;
  password: string;
  passwordConfirm?: string;
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
    passwordConfirm: '',
  });
  const { username, password, passwordConfirm } = state;

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  }, []);

  const onLogin = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      reduxDispatch(login({ username, password }));
    },
    [username, password, reduxDispatch]
  );

  const onRegister = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      if ([username, password].includes('')) {
        alert('빈 칸 없이 입력해주세요');
        return;
      }

      if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다');
        return;
      }

      reduxDispatch(register({ username, password }));
    },
    [username, password, passwordConfirm, reduxDispatch]
  );

  return {
    username,
    password,
    passwordConfirm,
    onChange,
    onLogin,
    onRegister,
  };
}
