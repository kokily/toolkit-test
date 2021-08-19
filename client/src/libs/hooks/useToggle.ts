import { useCallback, useState } from 'react';

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  const onToggle = useCallback(() => {
    setValue((prev) => !prev);
  }, [value]);

  return [value, onToggle] as [boolean, typeof onToggle];
}
