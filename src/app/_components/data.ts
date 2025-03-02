import type { TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  address: string;
  memo: string;
  createdAt: Date;
  job: string;
  isContentedToReceiveEmail: boolean;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

export type RecordType = "text" | "textarea" | "date" | "select" | "checkbox";

interface Record {
  type: RecordType;
}

export const recordFields = [
  {
    type: "text",
    label: "이름",
    required: true,
    dataIndex: "name",
  },
  {
    type: "text",
    label: "주소",
    required: false,
    dataIndex: "address",
  },
  {
    type: "textarea",
    label: "메모",
    required: false,
    dataIndex: "memo",
  },
  {
    type: "date",
    label: "가입일",
    required: true,
    dataIndex: "createdAt",
  },
  {
    type: "select",
    label: "직업",
    required: true,
    dataIndex: "job",
  },
  {
    type: "checkbox",
    label: "이메일 수신 동의",
    required: false,
    dataIndex: "isContentedToReceiveEmail",
  },
];
