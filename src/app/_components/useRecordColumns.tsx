import { STRING_UTIL } from "@/utils/string.util";
import { Checkbox, TableColumnsType } from "antd";
import { Key, useMemo } from "react";
import { recordFields, RecordType } from "./data";
import RecordOptionDropdown from "./record-option-dropdown";
import { IFilterMap } from "./useRecordDataStore";

export interface IRecordData {
  key: React.Key;
  name: string;
  address?: string;
  memo?: string;
  createdAt: Date;
  job: string;
  isContentedToReceiveEmail: boolean;
}

export const useRecordColumns = ({
  filterMap,
  onEdit: handleEdit,
  onDelete: handleDelete,
}: {
  filterMap: IFilterMap;
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
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
              {Array.from(filterMap[dataIndex]).map((value) => {
                return (
                  <div key={value.toString()}>
                    <Checkbox
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedKeys([...selectedKeys, value]);
                        } else {
                          setSelectedKeys(
                            selectedKeys.filter(
                              (selectedKey) => selectedKey !== value
                            )
                          );
                        }
                        confirm();
                      }}
                    />
                    <FilterOption type={type} value={value} />
                  </div>
                );
              })}
            </div>
          ),
          onFilter: (value: boolean | Key, record: IRecordData) => {
            const recordValue =
              record[dataIndex] instanceof Date
                ? record[dataIndex].toISOString()
                : record[dataIndex]?.toString();

            return recordValue === value;
          },

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
            <RecordOptionDropdown
              record={data}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        },
      },
    ];
  }, [filterMap]);

  return { columns };
};

const FilterOption = ({ type, value }: { type: RecordType; value: string }) => {
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
};
