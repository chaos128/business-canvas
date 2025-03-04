import type { FormDataType } from "@/types/form.type";
import { Key } from "react";
import FilterMenuItem from "./filter-menu-item";

// customized filter dropdown - 시안상 antd Table의 filter 와 다르게 Reset, Ok 버튼이 없어 추가 개발하였습니다.
function FilterDropdown({
  filterList,
  setSelectedKeys,
  selectedKeys,
  type,
  confirm,
}: {
  filterList: string[];
  setSelectedKeys: (selectedKeys: Key[]) => void;
  selectedKeys: Key[];
  type: FormDataType;
  confirm: () => void;
}) {
  const handleChange = (checked: boolean, value: string) => {
    if (checked) {
      setSelectedKeys([...selectedKeys, value]);
    } else {
      setSelectedKeys(
        selectedKeys.filter((selectedKey) => selectedKey !== value)
      );
    }
    confirm();
  };

  return (
    <div
      className="min-w-[15rem] p-[0.8rem]  flex flex-col gap-y-[0.8rem]"
      onKeyDown={(e) => e.stopPropagation()}
    >
      {filterList.map((value) => {
        return (
          <FilterMenuItem
            onChange={handleChange}
            key={value.toString()}
            isSelected={selectedKeys.includes(value)}
            value={value}
            type={type}
          />
        );
      })}
    </div>
  );
}

export default FilterDropdown;
