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

export type TRecordDataIndex =
  | "name"
  | "address"
  | "memo"
  | "createdAt"
  | "job"
  | "isContentedToReceiveEmail";

export const recordFields: Record[] = [
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
    defaultValue: "개발자",
    options: [
      { label: "개발자", value: "개발자" },
      { label: "PO", value: "PO" },
      { label: "디자이너", value: "디자이너" },
    ],
  },
  {
    type: "checkbox",
    label: "이메일 수신 동의",
    required: false,
    dataIndex: "isContentedToReceiveEmail",
  },
];

export type JobType = "개발자" | "PO" | "디자이너";

export interface Record {
  type: RecordType;
  label: string;
  required: boolean;
  dataIndex: TRecordDataIndex;
  defaultValue?: string;
  options?: { label: string; value: JobType }[];
}
