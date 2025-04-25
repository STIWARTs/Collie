import { useCallback, useEffect, useMemo, useState } from 'react';

const getDeepValue = <T extends object>(obj: T, path = 'Id') => {
  const pathArr = path.split('.');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pathArr.reduce((acc: T, key) => acc && acc[key], obj);
};

type useNavigateListProps<T, K extends keyof T> = {
  list: T[];
  onSelect: (item: T) => void;
  GetEmptySearch: boolean;
  EmptySearch: (value: string) => void;
  indexPath?: K;
  vertical?: boolean;
};

const useNavigateList = <T extends object, K extends keyof T>({
  list,
  GetEmptySearch,
  EmptySearch,
  onSelect,
  indexPath,
  vertical = true,
}: useNavigateListProps<T, K>) => {
  const [cursor, setCursor] = useState(-1);

  const prevItemKey = useMemo(
    () => (vertical ? 'ArrowUp' : 'ArrowLeft'),
    [vertical],
  );

  const nextItemKey = useMemo(
    () => (vertical ? 'ArrowDown' : 'ArrowRight'),
    [vertical],
  );

  const downHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === prevItemKey) {
        const value = cursor > 0 ? cursor - 1 : list.length - 1;
        if (list && list.length > 0 && list[value]) {
          onSelect(list[value] as T);
        }
        setCursor(value);
      } else if (key === nextItemKey) {
        const value = cursor < list.length - 1 ? cursor + 1 : 0;
        if (list && list.length > 0 && list[value]) {
          onSelect(list[value] as T);
        }
        setCursor(value);
      } else if (key === 'Enter') {
        if (cursor >= 0 && cursor < list.length && list[cursor]) {
          onSelect(list[cursor] as T);
        }
        // Proceed Search
      }
    },
    [cursor, list, nextItemKey, prevItemKey, onSelect],
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [downHandler]);

  useEffect(() => {
    if (GetEmptySearch) setCursor(-1);
  }, [GetEmptySearch]);

  const onPointerEnter = useCallback(
    (hoveredItem: T) => {
      const value = list.findIndex(
        (listItem) =>
          getDeepValue(listItem, indexPath as string) ===
          getDeepValue(hoveredItem, indexPath as string),
      );
      // onSelect(list[value] as T);
      setCursor(value);
    },
    [indexPath, list],
  );

  const onPointerLeave = useCallback(() => {
    setCursor(-1);
  }, []);

  return useMemo(
    () => ({
      activeIndex: cursor,
      itemProps: (item: T) => ({
        onPointerLeave: () => onPointerLeave(),
        onPointerEnter: () => onPointerEnter(item),
        onClick: () => {
          if (item) {
            onSelect(item);
          }
        },
      }),
    }),
    [cursor, onPointerEnter, onPointerLeave, onSelect],
  );
};

export default useNavigateList;
