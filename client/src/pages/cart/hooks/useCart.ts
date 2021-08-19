import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

type StateProps = {
  title: string;
  hall: string;
  etc: string;
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

export default function useCart() {
  const history = useHistory();
  const reduxDispatch = useDispatch();
}
