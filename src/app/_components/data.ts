import { FormType } from "@/types/form.type";

export type TRecordDataIndex =
  | "name"
  | "address"
  | "memo"
  | "createdAt"
  | "job"
  | "isContentedToReceiveEmail";

export const recordFields: RecordField[] = [
  {
    type: "text",
    label: "이름",
    required: true,
    dataIndex: "name",
    columnWidth: "12rem",
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
    columnWidth: "20rem",
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
    columnWidth: "15rem",
  },
];

type JobType = "개발자" | "PO" | "디자이너";

export interface RecordField {
  type: FormType;
  label: string;
  required: boolean;
  dataIndex: TRecordDataIndex;
  defaultValue?: string;
  options?: { label: string; value: JobType }[];
  columnWidth?: string;
}
