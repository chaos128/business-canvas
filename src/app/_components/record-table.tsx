"use client";

import { Table, TableProps } from "antd";
import { RecordDataType, useRecordData } from "./useRecordData";

function RecordTable() {
  const { recordData, columns } = useRecordData();

  const rowSelection: TableProps<RecordDataType>["rowSelection"] = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: RecordDataType[]
    ) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: RecordDataType) => ({
      name: record.name,
    }),
  };

  return (
    <Table<RecordDataType>
      id="record-table"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={recordData}
      pagination={false}
    />
  );
}

export default RecordTable;
