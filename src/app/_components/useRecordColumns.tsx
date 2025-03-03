import { STRING_UTIL } from "@/utils/string.util";
import { Checkbox, TableColumnsType } from "antd";
import { useMemo } from "react";
import { recordFields, RecordType } from "./data";
import RecordOptionDropdown from "./record-option-dropdown";
import { IFilterMap, TRecordFieldValueType } from "./useRecordDataStore";

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
      ({ type, dataIndex, label }) => {
        return {
          title: label,
          dataIndex,
          filters: Array.from(filterMap[dataIndex]).map((value) => {
            return { text: value, value };
          }),
          filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
          }: {
            setSelectedKeys: (selectedKeys: TRecordFieldValueType[]) => void;
            selectedKeys: TRecordFieldValueType[];
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
          onFilter: (value: TRecordFieldValueType, record: IRecordData) => {
            return record[dataIndex] === value;
          },

          render:
            type === "date"
              ? (date: Date) => (
                  <span>{STRING_UTIL.dateToDateString(date)}</span>
                )
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

const FilterOption = ({
  type,
  value,
}: {
  type: RecordType;
  value: string | Date | boolean;
}) => {
  if (type === "checkbox") {
    if (value) {
      return <span>선택됨</span>;
    } else {
      return <span>선택 안함</span>;
    }
  } else if (type === "date") {
    return <span>{STRING_UTIL.dateToDateString(value as Date)}</span>;
  } else {
    return <span>{value.toString()}</span>;
  }
};
