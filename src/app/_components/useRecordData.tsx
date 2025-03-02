import { STRING_UTIL } from "@/utils/string.util";
import { Checkbox, TableColumnsType } from "antd";
import { useMemo } from "react";
import { recordFields } from "./data";
import RecordOptionDropdown from "./record-option-dropdown";

export interface RecordDataType {
  key: React.Key;
  name: string;
  address: string;
  memo: string;
  createdAt: Date;
  job: string;
  isContentedToReceiveEmail: boolean;
}

export const useRecordData = () => {
  const recordData: RecordDataType[] = [
    {
      key: 1,
      name: "John Doe",
      address: "서울 강남구",
      memo: "외국인",
      createdAt: new Date("2024-10-02"),
      job: "개발자",
      isContentedToReceiveEmail: true,
    },
    {
      key: 2,
      name: "Foo Bar",
      address: "서울 서초구",
      memo: "한국인",
      createdAt: new Date("2024-10-01"),
      job: "PO",
      isContentedToReceiveEmail: false,
    },
  ];

  const columns: TableColumnsType<RecordDataType> = useMemo(() => {
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

  const addRecord = (record: Record) => {};

  return { recordData, columns };
};
