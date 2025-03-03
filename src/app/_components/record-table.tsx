"use client";

import { Table, TableProps } from "antd";
import { memo, useEffect, useState } from "react";
import { useRecordColumns } from "./useRecordColumns";
import {
  IRecordData,
  TRecordDataIndex,
  useRecordDataStore,
} from "./useRecordDataStore";

function RecordTable({
  onEdit,
  onDelete,
}: {
  onEdit: (record: IRecordData) => void;
  onDelete: (key: React.Key) => void;
}) {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<TRecordDataIndex, string[] | null>
  >({
    name: null,
    address: null,
    memo: null,
    job: null,
    isContentedToReceiveEmail: null,
    createdAt: null,
  });
  const recordDataList = useRecordDataStore((state) => state.recordDataList);
  const filterMap = useRecordDataStore((state) => state.filterMap);
  const { columns } = useRecordColumns({
    onEdit,
    onDelete,
    filterMap,
    filteredInfo,
  });

  const rowSelection: TableProps<IRecordData>["rowSelection"] = {
    getCheckboxProps: (record: IRecordData) => ({
      name: record.name,
    }),
  };

  const handleChange: NonNullable<TableProps<IRecordData>["onChange"]> = (
    _,
    filters
  ) => {
    setFilteredInfo(filters as Record<TRecordDataIndex, string[] | null>);
  };

  useEffect(() => {
    const newFilteredInfo: Record<TRecordDataIndex, string[] | null> = {
      name: null,
      address: null,
      memo: null,
      job: null,
      isContentedToReceiveEmail: null,
      createdAt: null,
    };

    Object.entries(filteredInfo).forEach(([key, value]) => {
      if (value) {
        value.forEach((eachFilterValue) => {
          if (filterMap[key as TRecordDataIndex].has(eachFilterValue)) {
            let valueList = newFilteredInfo[key as TRecordDataIndex];
            if (valueList === null) {
              valueList = [];
            }
            valueList.push(eachFilterValue);
            newFilteredInfo[key as TRecordDataIndex] = valueList;
          }
        });
      }
    });

    setFilteredInfo(newFilteredInfo);
  }, [filterMap]);

  return (
    <Table<IRecordData>
      id="record-table"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={recordDataList}
      pagination={false}
      loading={recordDataList === undefined}
      onChange={handleChange}
    />
  );
}

export default memo(RecordTable);
