import { FormType } from "@/types/form.type";
import { Key } from "react";
import FilterMenuItem from "./filter-menu-item";

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
  type: FormType;
  confirm: () => void;
}) {
  const handleChange = (checked: boolean, value: string) => {
    console.log(" handleChange : value:", value);
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
