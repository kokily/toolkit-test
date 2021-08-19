import { combineReducers } from 'redux';
import auth from './auth';
import items from './items';
import cart from './cart';

const rootReducer = combineReducers({
  auth,
  items,
  cart,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
