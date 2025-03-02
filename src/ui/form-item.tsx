import { RecordType } from "@/app/_components/data";
import { Checkbox, DatePicker, Form, Input, Select } from "antd";

function FormItem<T>({
  label,
  name,
  type,
  required = false,
}: {
  type: RecordType;
  label: string;
  name: any;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <div>
        <label className="text-tertiary text-heading">{label}</label>
        {required && <span className="text-error ml-[0.4rem]">*</span>}
      </div>

      <Form.Item<T>
        name={name}
        rules={[{ required, message: `${label}을 입력해주세요. ` }]}
      >
        {type === "text" ? (
          <Input />
        ) : type === "textarea" ? (
          <Input.TextArea />
        ) : type === "checkbox" ? (
          <Checkbox />
        ) : type === "date" ? (
          <DatePicker />
        ) : type === "select" ? (
          <Select />
        ) : (
          <></>
        )}
      </Form.Item>
    </div>
  );
}

export default FormItem;
