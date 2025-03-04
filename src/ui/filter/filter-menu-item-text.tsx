import type { FormDataType } from "@/types/form.type";
import { STRING_UTIL } from "@/utils/string.util";

function FilterMenuItemText({
  type,
  value,
}: {
  type: FormDataType;
  value: string;
}) {
  if (type === "checkbox") {
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
