"use client";

import { Table, TableProps } from "antd";
import { IRecordData, useRecordData } from "./useRecordData";
import { useRecordDataStore } from "./useRecordDataStore";

function RecordTable() {
  const { columns } = useRecordData();
  const recordDataList = useRecordDataStore((state) => state.recordDataList);
  const isLoading = useRecordDataStore((state) => state.isLoading);
  console.log(" RecordTable : isLoading:", isLoading);

  if (isLoading) {
    return <div className="h-[50rem] animate-pulse rounded-2xl bg-gray-2002" />;
  }

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
