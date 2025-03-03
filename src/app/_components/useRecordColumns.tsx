import FilterDropdown from "@/ui/filter/filter-dropdown";
import { STRING_UTIL } from "@/utils/string.util";
import { Checkbox, TableColumnsType } from "antd";
import { Key, useMemo } from "react";
import RecordEdit from "./record-edit";
import { recordFields } from "./record.constant";
import {
  IFilterMap,
  IRecordData,
  TRecordDataIndex,
} from "./useRecordDataStore";

export const useRecordColumns = ({
  filterMap,
  filteredInfo,
  onEdit: handleEdit,
  onDelete: handleDelete,
}: {
  filterMap: IFilterMap;
  filteredInfo: Record<TRecordDataIndex, string[] | null>;
  onEdit: (record: IRecordData) => void;
  onDelete: (key: React.Key) => void;
}) => {
  const columns: TableColumnsType<IRecordData> = useMemo(() => {
    const columnsFromRecordFields = recordFields.map(
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
          onFilter: (value: boolean | Key, record: IRecordData) => {
            const recordValue =
              record[dataIndex] instanceof Date
                ? record[dataIndex].toISOString()
                : record[dataIndex]?.toString();

            return recordValue === value;
          },
          filteredValue: filteredInfo[dataIndex] ?? null,
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

    return [
      ...columnsFromRecordFields,
      {
        width: "4.8rem",
        render: (data) => {
          return (
            <RecordEdit
              record={data}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        },
      },
    ];
  }, [filterMap, handleEdit, handleDelete, filteredInfo]);

  return { columns };
};
