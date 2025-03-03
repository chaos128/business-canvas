import { Record } from "@/app/_components/data";
import { Checkbox, DatePicker, Form, Input, Select } from "antd";

function FormItem<T>({
  recordField: { label, required, dataIndex, type, options, defaultValue },
}: {
  recordField: Record;
}) {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <div>
        <label className="text-tertiary text-heading">{label}</label>
        {required && <span className="text-error ml-[0.4rem]">*</span>}
      </div>

      <Form.Item<T>
        name={dataIndex}
        rules={[{ required, message: `${label}을 입력해주세요. ` }]}
        wrapperCol={{ span: 24 }}
        valuePropName={type === "checkbox" ? "checked" : undefined}
      >
        {type === "text" ? (
          <Input
            placeholder="Input"
            className="w-full"
            style={{ width: "100%" }}
          />
        ) : type === "textarea" ? (
          <Input.TextArea placeholder="TextArea" />
        ) : type === "checkbox" ? (
          <Checkbox />
        ) : type === "date" ? (
          <DatePicker showNow={false} className="w-[16rem]" />
        ) : type === "select" ? (
          <Select
            options={options}
            popupMatchSelectWidth={false}
            dropdownStyle={{ width: "19.8rem" }}
            className="!w-fit"
          />
        ) : (
          <></>
        )}
      </Form.Item>
    </div>
  );
}

export default FormItem;
