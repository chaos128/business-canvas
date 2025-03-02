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

export const data: DataType[] = [
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

type RecordType = "text" | "textarea" | "date" | "select" | "checkbox";

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
    required: true,
    dataIndex: "address",
  },
  {
    type: "textarea",
    label: "메모",
    required: true,
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
    label: "이메일 주신 동의",
    required: true,
    dataIndex: "isContentedToReceiveEmail",
  },
];
