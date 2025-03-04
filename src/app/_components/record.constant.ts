import type { IFormItem } from "../../ui/form-item";
import { TRecordDataIndex } from "./useRecordDataStore";

export const recordFields: IRecordField[] = [
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
    defaultValue: false,
  },
];

export type JobType = "개발자" | "PO" | "디자이너";

export interface IRecordField extends IFormItem<TRecordDataIndex, JobType> {
  defaultValue?: string | boolean;
}
