import { STRING_UTIL } from "@/utils/string.util";
import { Checkbox, TableColumnsType } from "antd";
import { useMemo } from "react";
import { recordFields } from "./data";
import RecordOptionDropdown from "./record-option-dropdown";

export interface IRecordData {
  key: React.Key;
  name: string;
  address?: string;
  memo?: string;
  createdAt: Date;
  job: string;
  isContentedToReceiveEmail: boolean;
}

export const useRecordData = () => {
  const columns: TableColumnsType<IRecordData> = useMemo(() => {
    const columnsFromRecordFields = recordFields.map(
      ({ type, dataIndex, label }) => {
        return {
          title: label,
          dataIndex,
          render:
            type === "date"
              ? (date: Date) => (
                  <span>{STRING_UTIL.dateToDateString(date)}</span>
                )
              : type === "checkbox"
              ? () => {
                  return <Checkbox />;
                }
              : undefined,
        };
      }
    );

    return [
      ...columnsFromRecordFields,
      {
        render: () => {
          return <RecordOptionDropdown />;
        },
      },
    ];
  }, []);

  return { columns };
};
