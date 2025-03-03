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
  const recordDataList = useRecordDataStore((state) => state.recordDataList);
  const filterMap = useRecordDataStore((state) => state.filterMap);
  const { columns } = useRecordColumns({ onEdit, onDelete, filterMap });

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
      onChange={(_, filters) => {
        console.log(" filters:", filters);
      }}
      id="record-table"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={recordDataList}
      pagination={false}
      loading={recordDataList === undefined}
    />
  );
}

export default RecordTable;
