import FilterDropdown from "@/ui/filter/filter-dropdown";
import { IFormItem } from "@/ui/form-item";
import { STRING_UTIL } from "@/utils/string.util";
import { Checkbox, TableColumnsType } from "antd";
import { ColumnType } from "antd/es/table";
import { Key, useMemo } from "react";
import { useTableFiltersReset } from "./useTableFiltersReset";

// T: data key type - ex: TRecordDataIndex
// S: select options - ex: JobType
// R: data type - ex: IRecordData
export function useTableColumns<T extends string, S extends string, R>({
  filterMap,
  additionalColumns = [],
  fields,
}: {
  filterMap: Record<T, Set<string>>;
  additionalColumns?: ColumnType<R>[];
  fields: IFormItem<T, S>[];
}) {
  const { filteredInfo, setFilteredInfo } = useTableFiltersReset({ filterMap });

  const columns: TableColumnsType<R> = useMemo(() => {
    const columnsFromFields = fields.map(
      ({ type, dataIndex, label, columnWidth }) => {
        return {
          title: label,
          dataIndex,
          width: columnWidth,
          filters: Array.from(filterMap[dataIndex]).map((value) => {
            return {
              text: value,
              value: value,
            };
          }),
          filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
          }: {
            setSelectedKeys: (selectedKeys: Key[]) => void;
            selectedKeys: Key[];
            confirm: () => void;
          }) => (
            <FilterDropdown
              filterList={Array.from(filterMap[dataIndex])}
              setSelectedKeys={setSelectedKeys}
              selectedKeys={selectedKeys}
              type={type}
              confirm={confirm}
            />
          ),
          onFilter: (value: string | boolean | Key, record: R) => {
            let recordValue = record[dataIndex as unknown as keyof R];

            if (recordValue instanceof Date) {
              recordValue = recordValue.toISOString() as R[keyof R];
            } else {
              recordValue = recordValue?.toString() as R[keyof R];
            }

            return recordValue === value;
          },
          filteredValue: filteredInfo ? filteredInfo[dataIndex] ?? null : null,
          render:
            type === "date"
              ? (date: Date) => <span>{STRING_UTIL.toDateString(date)}</span>
              : type === "checkbox"
              ? (checked: boolean) => {
                  return <Checkbox checked={checked} />;
                }
              : undefined,
        };
      }
    );

    return [...columnsFromFields, ...additionalColumns];
  }, [filterMap, filteredInfo]);

  return { columns, setFilteredInfo };
}
