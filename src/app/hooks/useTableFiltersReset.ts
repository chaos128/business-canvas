import { useEffect, useState } from "react";

// filter 걸렸을 때 나오는 record 가 하나일 경우
// record 에 대해 edit, remove 을 시켜 filter 걸린 record 가 없어질 경우
// filter list 에 해당 value 도 사라져서 active 된 filter 를 해제시킬 수 없는 경우를 위함
export function useTableFiltersReset<T extends string>({
  filterMap,
}: {
  filterMap: Record<T, Set<string>>;
}) {
  const [filteredInfo, setFilteredInfo] =
    useState<Record<T, string[] | null | undefined>>();

  useEffect(() => {
    const newFilteredInfo: Record<T, string[] | null> = {} as Record<
      T,
      string[] | null
    >;
    Object.entries(filteredInfo ?? {}).forEach(([key, value]) => {
      if (value) {
        (value as string[]).forEach((eachFilterValue) => {
          if (filterMap[key as T].has(eachFilterValue)) {
            let valueList = newFilteredInfo[key as T];
            if (!valueList) {
              valueList = [];
            }
            valueList.push(eachFilterValue);
            newFilteredInfo[key as T] = valueList;
          }
        });
      }
    });

    setFilteredInfo(newFilteredInfo);
  }, [filterMap]);

  return { filteredInfo, setFilteredInfo };
}
