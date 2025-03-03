"use client";

import { Table, TableProps } from "antd";
import { IRecordData, useRecordColumns } from "./useRecordColumns";
import { useRecordDataStore } from "./useRecordDataStore";

function RecordTable({
  onEdit,
  onDelete,
}: {
  onEdit: (record: IRecordData) => void;
  onDelete: (key: React.Key) => void;
}) {
  const { columns } = useRecordColumns({ onEdit, onDelete });
  const recordDataList = useRecordDataStore((state) => state.recordDataList);

  const rowSelection: TableProps<IRecordData>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IRecordData[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
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
    />
  );
}

export default RecordTable;
