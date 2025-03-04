"use client";

import { Table, TableProps } from "antd";
import { memo } from "react";
import { useRecordTableColumns } from "./useRecordColumns";
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
  onDelete: (record: IRecordData) => void;
}) {
  const recordDataList = useRecordDataStore((state) => state.recordDataList);
  const filterMap = useRecordDataStore((state) => state.filterMap);
  const { columns, setFilteredInfo } = useRecordTableColumns({
    onEdit,
    onDelete,
    filterMap,
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
