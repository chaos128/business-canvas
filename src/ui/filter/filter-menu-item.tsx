import { FormType } from "@/types/form.type";
import { Checkbox } from "antd";
import FilterMenuItemText from "./filter-menu-item-text";

function FilterMenuItem({
  onChange: handleChange,
  value,
  type,
  isSelected,
}: {
  onChange: (checked: boolean, value: string) => void;
  value: string;
  type: FormType;
  isSelected: boolean;
}) {
  return (
    <div
      className={`h-[3.2rem] px-[1.2rem] py-[0.5rem] rounded-lg hover:bg-control-item-bg-hover ${
        isSelected ? "!bg-control-item-bg-active" : ""
      }`}
    >
      <Checkbox
        onChange={(e) => {
          handleChange(e.target.checked, value);
        }}
      />
      <FilterMenuItemText type={type} value={value} />
    </div>
  );
}

export default FilterMenuItem;
