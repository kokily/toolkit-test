import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { menu } from '../../../libs/menu';

export default function useHome() {
  const history = useHistory();
  const [native, setNative] = useState('soldier');

  const onMenu = (divide: string) => {
    let menu = '';

    if (native === 'soldier') {
      menu = '현역';
    } else if (native === 'reserve') {
      menu = '예비역';
    } else if (native === 'general') {
      menu = '일반';
    }

    history.push(`/menu?native=${menu}&divide=${divide}`);
  };

  useEffect(() => {
    setNative(history.location.pathname.substring(1));
  }, [history.location]);

  return { menu, native, onMenu };
}
