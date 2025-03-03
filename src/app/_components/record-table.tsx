"use client";

import { Table, TableProps } from "antd";
import { memo } from "react";
import { useRecordColumns } from "./useRecordColumns";
import { IRecordData, useRecordDataStore } from "./useRecordDataStore";

function RecordTable({
  onEdit,
  onDelete,
}: {
  onEdit: (record: IRecordData) => void;
  onDelete: (key: React.Key) => void;
}) {
  const recordDataList = useRecordDataStore((state) => state.recordDataList);
  const filterMap = useRecordDataStore((state) => state.filterMap);
  const { columns } = useRecordColumns({ onEdit, onDelete, filterMap });

  const rowSelection: TableProps<IRecordData>["rowSelection"] = {
    getCheckboxProps: (record: IRecordData) => ({
      name: record.name,
    }),
  };

  return (
    <Table<IRecordData>
      id="record-table"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={recordDataList}
      pagination={false}
      loading={recordDataList === undefined}
    />
  );
}

export default memo(RecordTable);
