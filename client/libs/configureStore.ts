import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './modules';

const isDev = process.env.NODE_ENV === 'development';

const store = () => {
  const middleware = getDefaultMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: isDev,
  });

  return store;
};

const wrapper = createWrapper(store, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
