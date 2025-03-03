import { FormType } from "@/types/form.type";
import { STRING_UTIL } from "@/utils/string.util";

function FilterMenuItemText({
  type,
  value,
}: {
  type: FormType;
  value: string;
}) {
  if (type === "checkbox") {
    console.log(" value:", value);

    if (value === "true") {
      return <span>선택됨</span>;
    } else {
      return <span>선택 안함</span>;
    }
  } else if (type === "date") {
    return <span>{STRING_UTIL.toDateString(value)}</span>;
  } else {
    return <span>{value.toString()}</span>;
  }
}

export default FilterMenuItemText;
