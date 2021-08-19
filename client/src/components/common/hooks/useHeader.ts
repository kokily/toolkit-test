import React, { useCallback, useRef } from 'react';
import useToggle from '../../../libs/hooks/useToggle';

export default function useHeader() {
  const [toggle, setToggle] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);

  const onOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as any)) return;

      setToggle();
    },
    [setToggle]
  );

  return {
    toggle,
    setToggle,
    ref,
    onOutsideClick,
  };
}
